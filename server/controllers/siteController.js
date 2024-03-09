const Site = require("../models/Site");

const getSite = async (req, res) => {
  const { siteId } = req.params;

  if (!siteId) {
    throw new Error("Site ID is required.");
  }

  try {
    const site = await Site.findById(siteId);

    if (!site) {
      throw new Error(`Site with id ${siteId} not found`);
    }

    res.status(200).json(site);
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid Site ID.");
    }

    throw new Error("Error getting site.");
  }
};

const getAllSitesByAdmin = async (req, res) => {
  const { adminId } = req.params;

  if (!adminId) {
    throw new Error("Admin ID is required.");
  }

  try {
    const sites = await Site.find({ adminId: adminId });

    if (!sites) {
      throw new Error(`No sites found for admin with id ${adminId}`);
    }

    res.status(200).json(sites);
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid Admin ID.");
    }

    throw new Error("Error getting sites.");
  }
};

const createSite = async (req, res) => {
  const siteData = req.body;
  console.log(siteData);
  const user = req.userData;

  if (!user) {
    throw new Error("User not found.");
  }

  if (!siteData) {
    throw new Error("Site data is required.");
  }

  siteData.admin = user.id;

  try {
    const site = new Site(siteData);
    const newSite = await site.save();

    res.status(201).json(newSite);
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new Error("Invalid site data.");
    }
    console.log(error);

    throw new Error("Error creating site.");
  }
};

const updateSite = async (req, res) => {
  const { siteId } = req.params;
  const siteData = req.body;

  if (!siteId) {
    throw new Error("Site ID is required.");
  }

  if (!siteData || Object.keys(siteData).length === 0) {
    throw new Error("Site data is required for update.");
  }

  try {
    const site = await Site.findById(siteId);
    if (!site) {
      throw new Error(`Site with id ${siteId} not found`);
    }

    const updatedSite = await Site.findByIdAndUpdate(siteId, siteData, {
      new: true,
    });

    res.status(200).json(updatedSite);
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid Site ID.");
    }

    if (error.name === "ValidationError") {
      throw new Error("Invalid site data.");
    }

    throw new Error("Error updating site.");
  }
};

const deleteSite = async (req, res) => {
  const { siteId } = req.params;

  if (!siteId) {
    throw new Error("Site ID is required.");
  }

  try {
    const site = await Site.findById(siteId);
    if (!site) {
      throw new Error(`Site with id ${siteId} not found`);
    }

    await Site.findByIdAndDelete(siteId);
    res.status(200).json({ message: "Deleted site" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      throw new Error("Invalid Site ID.");
    }
    throw new Error("Error deleting site.");
  }
};

module.exports = {
  getSite,
  createSite,
  updateSite,
  deleteSite,
  getAllSitesByAdmin,
};
