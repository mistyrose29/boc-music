import React from 'react';
import ConfirmModal from './ConfirmModal.jsx';
import { Card, Button } from 'react-bootstrap';
import { deleteProject } from '../../../../database/controllers.js';

const ProjectView = ({ project, loadProject, projectId, reload }) => {
  return (
    <Card className='card-shadow'>
      <Card.Header>
        <div className="flex-row justify-between center-items">
          <span>{project.title} - {project.public ? 'Public' : 'Private'}</span>
          <ConfirmModal
            deleteTitle='Delete Project'
            deleteText='Are you sure you want to delete this project? All associated files with this project will be deleted as well.'
            cb={deleteProject}
            cbValue={projectId}
            reload={reload}
            outline={false}/>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {project.createdAt.toDate().toDateString()}
        </Card.Subtitle>
        <Card.Text>
          {project.description}
        </Card.Text>
        <Button
          variant="primary"
          projecttitle={project.title}
          projectowner={project.owner}
          projectid={project.id}
          onClick={loadProject}>
            Open Project
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectView;