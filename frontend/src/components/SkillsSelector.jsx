import React, { useState } from "react";

const skillsOptions = [
  "Software Development (e.g., Java, Python)",
  "Cybersecurity",
  "Cloud Computing (e.g., AWS, Azure)",
  "Data Analysis & Visualization",
  "System Administration",
  "Patient Care & Safety",
  "Medical Coding & Billing",
  "Healthcare Administration",
  "Clinical Research",
  "Nursing & Clinical Support",
  "Financial Analysis",
  "Accounting & Bookkeeping",
  "Budgeting & Forecasting",
  "Investment Management",
  "Risk Management",
  "Project Management (e.g., Agile, Scrum)",
  "Team Leadership",
  "Strategic Planning",
  "Operations Management",
  "Performance Evaluation",
  "Curriculum Development",
  "Classroom Management",
  "E-Learning & Educational Technology",
  "Instructional Design",
  "Student Assessment",
  "Graphic Design (e.g., Adobe Creative Suite)",
  "UI/UX Design",
  "Product & Industrial Design",
  "Web & Mobile Design",
  "Animation & Motion Graphics",
  "Digital Marketing (SEO, SEM)",
  "Content Marketing",
  "Social Media Marketing",
  "Market Research & Analysis",
  "Email Marketing & Automation",
  "B2B/B2C Sales Strategies",
  "Lead Generation & Prospecting",
  "Negotiation & Closing",
  "Customer Relationship Management (CRM)",
  "Sales Presentations & Pitches",
  "Recruitment & Talent Acquisition",
  "Employee Relations",
  "Performance Management",
  "Payroll & Benefits Administration",
  "HR Compliance & Policy Development",
  "Product Management",
  "Roadmapping & Strategy",
  "User Experience Research",
  "Agile Product Development",
  "Product Lifecycle Management",
  "Supply Chain Management",
  "Process Optimization",
  "Inventory & Logistics Management",
  "Quality Control & Assurance",
  "Vendor Management",
  "Customer Service Excellence",
  "Technical Support & Troubleshooting",
  "Conflict Resolution",
  "CRM Software Proficiency",
  "Communication & Empathy",
  "Data Analysis (qualitative & quantitative)",
  "Statistical Analysis (e.g., SPSS, R)",
  "Research Design & Methodology",
  "Literature Review",
  "Report Writing & Presentation",
  "Mechanical Engineering",
  "Electrical/Electronics Engineering",
  "Civil & Structural Engineering",
  "Software/Systems Engineering",
  "CAD & Simulation Tools",
  "Legal Research & Writing",
  "Contract Drafting & Negotiation",
  "Compliance & Regulatory Affairs",
  "Litigation Support",
  "Intellectual Property Management",
  "Content Creation (writing, video)",
  "Social Media Management",
  "Copywriting & Editing",
  "Video Production & Editing",
  "Public Relations",
  "Construction Management",
  "Project Scheduling & Estimation",
  "Blueprint Reading & Drafting",
  "Safety & Compliance",
  "Cost Management",
  "Strategic Consulting",
  "Business Analysis",
  "Change Management",
  "Process Improvement",
  "Organizational Development",
];

const SkillsSelector = ({ formData, setFormData, errors }) => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleAddSkill = () => {
    const skillToAdd = selectedSkill.trim();
    if (skillToAdd && !formData.careerInformation.skills.includes(skillToAdd)) {
      setFormData((prevData) => ({
        ...prevData,
        careerInformation: {
          ...prevData.careerInformation,
          skills: [...prevData.careerInformation.skills, skillToAdd],
        },
      }));
      setSelectedSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      careerInformation: {
        ...prevData.careerInformation,
        skills: prevData.careerInformation.skills.filter((s) => s !== skill),
      },
    }));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setFormData((prevData) => {
      const newSkills = [...prevData.careerInformation.skills];
      [newSkills[index - 1], newSkills[index]] = [
        newSkills[index],
        newSkills[index - 1],
      ];
      return {
        ...prevData,
        careerInformation: {
          ...prevData.careerInformation,
          skills: newSkills,
        },
      };
    });
  };

  const handleMoveDown = (index) => {
    setFormData((prevData) => {
      const newSkills = [...prevData.careerInformation.skills];
      if (index === newSkills.length - 1) return prevData;
      [newSkills[index], newSkills[index + 1]] = [
        newSkills[index + 1],
        newSkills[index],
      ];
      return {
        ...prevData,
        careerInformation: {
          ...prevData.careerInformation,
          skills: newSkills,
        },
      };
    });
  };

  return (
    <div>
      <label className="block text-gray-700 font-medium font-poppins mb-2">
        Skills
      </label>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          list="skillsOptions"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          placeholder="Select or type a skill"
          className="w-full border border-gray-300 bg-gray-200 font-poppins font-medium rounded-2xl shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select or type a skill"
        />
        <datalist id="skillsOptions">
          {skillsOptions.map((skill) => {
            const isSelected =
              formData.careerInformation.skills.includes(skill);
            return (
              <option
                key={skill}
                value={skill}
                className={isSelected ? "bg-gray-300 text-gray-500" : ""}
              >
                {skill}
              </option>
            );
          })}
        </datalist>
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-blue-500 text-white px-5 py-3 rounded-2xl font-poppins font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-md"
          aria-label="Add skill"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.careerInformation.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full shadow-sm hover:bg-blue-100 transition-colors"
          >
            <span className="font-poppins font-medium">{skill}</span>
            <div className="flex ml-2">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  className="text-blue-600 hover:text-blue-800 mx-1"
                  aria-label={`Move ${skill} up`}
                >
                  ▲
                </button>
              )}
              {index < formData.careerInformation.skills.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  className="text-blue-600 hover:text-blue-800 mx-1"
                  aria-label={`Move ${skill} down`}
                >
                  ▼
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label={`Remove ${skill}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {errors.skills && (
        <p className="mt-2 text-sm text-red-500 font-poppins">
          {errors.skills}
        </p>
      )}
    </div>
  );
};

export default SkillsSelector;
