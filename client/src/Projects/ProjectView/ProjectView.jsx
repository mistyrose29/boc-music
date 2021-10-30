import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProjectView = ({ project, loadProject }) => {
  return (
    <Card>
      <Card.Header>
        {project.title} - {project.public ? 'Public' : 'Private'}
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
          projectid={project.id}
          onClick={loadProject}>
            Open Project
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectView;