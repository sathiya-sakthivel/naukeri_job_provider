import React, { useState } from "react";

const ResumeList = () => {
  const [resumes] = useState([
    { id: 1, name: "John Doe", url: "/resumes/john_doe.pdf" },
    { id: 2, name: "Jane Smith", url: "/resumes/jane_smith.pdf" },
    { id: 3, name: "Michael Johnson", url: "/resumes/michael_johnson.pdf" },
    { id: 4, name: "Priya Sharma", url: "/resumes/priya_sharma_resume.pdf" },
    { id: 5, name: "Rahul Verma", url: "/resumes/rahul_verma_resume.pdf" },
    { id: 6, name: "Aditi Singh", url: "/resumes/aditi_singh_resume.pdf" },
    { id: 7, name: "Karan Mehta", url: "/resumes/karan_mehta_resume.pdf" },
  ]);

  const [selectedResume, setSelectedResume] = useState(null);

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
  };

  const handleClose = () => {
    setSelectedResume(null);
  };

  const handleDownloadResume = (resumeUrl, fileName) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = fileName || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Resume List</h2>

      <ul className="space-y-3">
        {resumes.map((resume) => (
          <li
            key={resume.id}
            className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-white"
          >
            <span className="text-gray-800 font-medium">{resume.name}</span>
            <button
              onClick={() => handleViewResume(resume)}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              View Resume
            </button>
          </li>
        ))}
      </ul>

      {selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h3 className="text-lg font-semibold mb-4">
              {selectedResume.name}'s Resume
            </h3>
            <iframe
              src={selectedResume.url}
              title="Resume Preview"
              className="w-full h-96 border mb-4"
            ></iframe>

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  handleDownloadResume(selectedResume.url, selectedResume.name + ".pdf")
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download Resume
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeList;
