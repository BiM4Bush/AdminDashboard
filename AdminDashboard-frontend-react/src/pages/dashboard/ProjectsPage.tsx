import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../components/general/Button";
import {
  PROJECTS,
  SORT_PROJECT,
  CREATE_PROJECT,
  FILTER_PROJECT,
  UPDATE_PROJECTS,
  DEACTIVATE_PROJECTS,
} from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import { IProject, IProjectDto } from "../../types/project.types";

const ProjectsPage: React.FC = () => {
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<IProjectDto>({
    projectType: "",
    startDate: new Date(),
    endDate: new Date(),
    projectManager: async () => {},
    comment: "",
    status: "",
  });

  useEffect(() => {
    fetchProjects();
  }, [sortBy, filterBy, filterValue]);

  const fetchProjects = async () => {
    try {
      let url = PROJECTS;
      if (sortBy) {
        url = `${SORT_PROJECT}?sortBy=${sortBy}`;
      } else if (filterBy && filterValue) {
        url = `${FILTER_PROJECT}?filterBy=${filterBy}&filterValue=${filterValue}`;
      }
      
      const response = await axiosInstance.get(url);
      setProjectsList(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddProject = async (projectDto: IProjectDto) => {
    try {
      await axiosInstance.post(CREATE_PROJECT, projectDto);
      fetchProjects();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  const handleUpdateProject = async (
    id: number,
    updatedProject: Partial<IProjectDto>
  ) => {
    try {
      await axiosInstance.put(`${UPDATE_PROJECTS}/${id}`, updatedProject);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  const handleDeactivateProject = async (id: number) => {
    try {
      await axiosInstance.put(`${DEACTIVATE_PROJECTS}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deactivating project:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddProject(newProject);
  };
  return (
    <div className="bg-white p-2 rounded-md">
      <h1 className="text-xl font-bold">Projects Table</h1>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by name"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border p-1 rounded-md"
          />
          <Button
            label="Search"
            onClick={fetchProjects}
            type="button"
            variant="secondary"
          />
        </div>
        <div className="flex space-x-2">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="border p-1 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="fullname">Full Name</option>
            <option value="subdivision">Subdivision</option>
            <option value="position">Position</option>
            <option value="status">Status</option>
          </select>
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            value={filterBy}
            className="border p-1 rounded-md"
          >
            <option value="">Filter By</option>
            <option value="subdivision">Subdivision</option>
            <option value="position">Position</option>
            <option value="status">Status</option>
          </select>
          <Button
            label="Filter"
            onClick={fetchProjects}
            type="button"
            variant="secondary"
          />
        </div>
        <Button
          label="Add"
          onClick={() => setShowAddForm(true)}
          type="button"
          variant="primary"
        />
      </div>
      <div className="grid grid-cols-8 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
        <div>No</div>
        <div>Project Type</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>Project Manager</div>
        <div>Comment</div>
        <div>Status</div>
        <div>Operations</div>
      </div>
      {projectsList.map((project, index) => (
        <div
          key={project.id}
          className="grid grid-cols-8 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md"
        >
          <div className="flex items-center">{index + 1}</div>
          <div className="flex items-center font-semibold">
            {project.projectType}
          </div>
          <div className="flex items-center">
            {moment(project.startDate).format("YYYY-MM-DD")}
          </div>
          <div className="flex items-center">
            {moment(project.endDate).format("YYYY-MM-DD")}
          </div>
          <div className="flex items-center">Project Manager Name</div>
          <div className="flex items-center">{project.comment}</div>
          <div className="flex items-center">{project.status}</div>
          <div className="flex items-center space-x-2">
            <Button
              label="Update"
              onClick={() => handleUpdateProject(project.id, project)}
              type="button"
              variant="primary"
            />
            <Button
              label="Deactivate"
              onClick={() => handleDeactivateProject(project.id)}
              type="button"
              variant="danger"
            />
          </div>
        </div>
      ))}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Project Type</label>
                <input
                  type="text"
                  name="projectType"
                  value={newProject.projectType}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={moment(newProject.startDate).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={moment(newProject.endDate).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Comment</label>
                <input
                  type="text"
                  name="comment"
                  value={newProject.comment}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  className="border p-1 rounded-md w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  label="Cancel"
                  onClick={() => setShowAddForm(false)}
                  type="button"
                  variant="danger"
                />
                <Button
                  label="Add Project"
                  onClick={() => handleSubmit}
                  type="submit"
                  variant="primary"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectsPage;