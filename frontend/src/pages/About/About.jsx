import React from 'react'

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About the Project</h1>
      <p className="mb-4">
        This project is designed to help animal shelters efficiently manage adoption records. Many shelters currently face challenges with outdated or manual systems, which makes it difficult to track animals, monitor health conditions, and match them with suitable adopters.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Problem Statement</h2>
      <p className="mb-4">
        Existing platforms like Petfinder or Shelterluv often focus heavily on public-facing features and marketing tools, which are costly and overly complex for smaller shelters. Additionally, many of these services don’t offer full control over backend data.
      </p>
      <p className="mb-4">
        Our solution focuses on internal data management by providing a lightweight, cost-effective system tailored to the operational needs of shelter staff.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Project Objectives</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Design and implement a database to store animal, adopter, and adoption records.</li>
        <li>Enable search and filter features based on breed, age, health condition, and adoption status.</li>
        <li>Allow shelter staff to easily manage data and monitor the adoption process.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Scope</h2>
      <p className="mb-4">
        This system is intended for shelter personnel. It does not include advanced features like online applications or payment systems but prioritizes simplicity, reliability, and usability.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Technologies Used</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Database: MongoDB</li>
        <li>Backend: Node.js</li>
        <li>Optional Web Interface: React.js, TailwindCss</li>
        <li>Development Tools:MongoDB, MongoDB Canvas, Visual Studio Code, Lucidchart, Microsoft Word & PowerPoint</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Credits</h2>
      <p className="mb-1">Developed by: Malika Agzamova & Sofiya Mishnyova</p>
      <p>Based on research and references from peer-reviewed articles and animal adoption platforms.</p>
    </div>
  )
}

export default About
