export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  // ডেট ভ্যালিড কিনা চেক করার জন্য
  if (isNaN(date.getTime())) return dateString;

  // মাসের নাম ছোট হাতের অক্ষরে পাওয়ার জন্য (e.g., 'july')
  const month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();

  // দিন ২ ডিজিটে রাখার জন্য (e.g., '06')
  const day = String(date.getDate()).padStart(2, "0");

  // বছরের শেষের ২ ডিজিট নেওয়ার জন্য (e.g., '26')
  const year = String(date.getFullYear()).slice(-2);

  return `${month}-${day}-${year}`;
};
