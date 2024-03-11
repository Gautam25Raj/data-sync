const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const Site = require("../models/Site");

const {
  getRequestHeader,
  getProjects,
  getViews,
  getWorkbooks,
} = require("../utils/utils");

const getTableauToken = async (req, res) => {
  const { siteId } = req.params;
  const userData = req.userData;

  try {
    if (!siteId) {
      throw new Error("Site ID is required");
    }

    const siteData = await Site.findById(siteId);

    if (!siteData) {
      throw new Error(`Site with id ${siteId} not found`);
    }

    if (siteData.admin.toString() !== userData.id) {
      throw new Error("Unauthorized");
    }

    const { username, clientId, appSecretId, appSecretValue } = siteData;

    const payload = {
      jti: randomBytes(64).toString("hex"),
      iss: clientId,
      aud: "tableau",
      sub: username,
      scp: ["tableau:views:embed", "tableau:views:embed_authoring"],
    };

    const token = jwt.sign(payload, appSecretValue, {
      algorithm: "HS256",
      expiresIn: "30d",
      header: {
        kid: appSecretId,
        iss: clientId,
      },
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting tableau token.", error: error.message });
  }
};

const getTableauProjects = async (req, res) => {
  const userData = req.userData;
  const dbSiteId = req.params.siteId;

  try {
    if (!dbSiteId) {
      throw new Error("Site ID is required");
    }

    const siteData = await Site.findById(dbSiteId);

    if (!siteData) {
      throw new Error(`Site with id ${dbSiteId} not found`);
    }

    if (siteData.admin.toString() !== userData.id) {
      throw new Error("Unauthorized");
    }

    const { patName, patSecret, siteName, baseUrl, siteId } = siteData;

    const headers = await getRequestHeader({
      baseUrl,
      patName,
      patSecret,
      siteName,
    });

    const projects = await getProjects(headers, {
      baseUrl,
      siteId,
    });

    const projectsWithWorkbooks = await Promise.all(
      projects.map(async (project) => {
        const workbooks = await getWorkbooks(
          project.name,
          {
            baseUrl,
            siteId,
          },
          headers
        );

        const workbooksWithViews = await Promise.all(
          workbooks.map(async (workbook) => {
            const views = await getViews(
              workbook.id,
              project.name,
              workbook.name,
              {
                baseUrl,
                siteId,
                siteName,
              },
              headers
            );
            return { ...workbook, views };
          })
        );
        return { ...project, workbooks: workbooksWithViews };
      })
    );

    return res.status(200).json(projectsWithWorkbooks);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting tableau projects.",
      error: error.message,
    });
  }
};

module.exports = { getTableauToken, getTableauProjects };
