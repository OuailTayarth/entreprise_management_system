export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => ({
  "& .MuiDataGrid-columnHeaders": {
    color: isDarkMode ? "#e5e7eb" : undefined,
    '& [role="row"] > *': {
      backgroundColor: isDarkMode ? "#1d1f21" : "white",
      borderColor: isDarkMode ? "#2d3135" : undefined,
    },
  },

  "& .MuiDataGrid-root": {
    fontFamily: "var(--font-poppins), system-ui, sans-serif !important",
    fontSize: "1rem",
  },

  "& .MuiDataGrid-cell, & .MuiDataGrid-cellContent, & .MuiDataGrid-columnHeaderTitle":
    {
      fontFamily: "var(--font-poppins), system-ui, sans-serif !important",
      fontSize: "0.875rem !important",
    },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 500,
    fontSize: "13px",
    color: isDarkMode ? "#e5e7eb" : "inherit",
  },

  "& .MuiDataGrid-menuIconButton": {
    color: isDarkMode ? "#e5e7eb !important" : undefined,
    "& .MuiSvgIcon-root": {
      color: isDarkMode ? "#e5e7eb !important" : undefined,
    },
    "&:hover": {
      color: isDarkMode ? "#ffffff !important" : undefined,
      "& .MuiSvgIcon-root": {
        color: isDarkMode ? "#ffffff !important" : undefined,
      },
    },
  },

  "& .MuiDataGrid-sortIcon": {
    color: isDarkMode ? "#e5e7eb !important" : undefined,
  },

  "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
    color: isDarkMode ? "#e5e7eb !important" : undefined,
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: isDarkMode ? "#2d3135" : "#f3f4f6",
    color: isDarkMode ? "#e5e7eb" : undefined,
  },

  "& .MuiDataGrid-columnHeader:hover": {
    backgroundColor: isDarkMode ? "#23272a" : "#f3f4f6",
  },

  "& .MuiDataGrid-cell": { border: "none" },
  "& .MuiDataGrid-row": {
    borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
  },
  "& .MuiDataGrid-withBorderColor": {
    borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
  },
});

export const keyToUrl = (key?: string | null | undefined) => {
  if (!key) return "/placeholder.jpg";
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`;
};

export const formatSalary = (value: string | number) => {
  return `${Number(value).toLocaleString()} €`;
};

export const normalizeSalary = (value: string): number => {
  return Number(value.replace(/[^0-9]/g, ""));
};
