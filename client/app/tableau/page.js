"use client";

import AuthProvider from "@/providers/AuthProvider";

const page = () => {
  return (
    <AuthProvider>
      <tableau-viz
        id="tableauViz"
        height="100%"
        width="100%"
        hide-tabs
        hide-edit-button
        src={
          "https://10ax.online.tableau.com/#/site/noober/views/Superstore/Overview"
        }
        toolbar="top"
        token={
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNiMjk1YzBkLWFhODEtNGQwYy1iZWI0LTFkYzU4Yjg0NzM3MiIsImlzcyI6ImIyNjA3NDc0LThkNDEtNGQ5NS05MDBkLWQxYjRmMzg4NDc3MSJ9.eyJqdGkiOiJjZTlmMzg1ODVlMjFhYjY5OWM2ZDE3YmFkN2MwNzgxMTdjNDBiMWZhMDVhNzc0ZDM2YWVlZjI1YWNhNTlhYzExODA5MmFlOWE5MGEwYjFhNjgyM2VjOWQ3NDJjZDBjNjFkYWVjNzkwOTU2Y2UxZmIxZGIzMzBmOWYyYmY1MmVkYSIsImlzcyI6ImIyNjA3NDc0LThkNDEtNGQ5NS05MDBkLWQxYjRmMzg4NDc3MSIsImF1ZCI6InRhYmxlYXUiLCJzdWIiOiJhc2hyYWdhdXRhbTI1QGdtYWlsLmNvbSIsInNjcCI6WyJ0YWJsZWF1OnZpZXdzOmVtYmVkIiwidGFibGVhdTp2aWV3czplbWJlZF9hdXRob3JpbmciXSwiaWF0IjoxNzEwMTYwOTc3LCJleHAiOjE3MTAxNjEyNzd9.UlId-oAfJ_7t2PmIcWtOXVJsn9BldX2af4HG-BnRQdM"
        }
      ></tableau-viz>
    </AuthProvider>
  );
};

export default page;
