import React from 'react';
import Share from '../../Share/Share.jsx';
import ConfirmModal from './ConfirmModal.jsx';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { deleteProject } from '../../../../database/controllers.js';
import { Icon } from '@iconify/react';

const ProjectView = ({ userId, friends, project, loadProject, projectId, reload, index }) => {
  return (
    <Card className='card-shadow'>
      <Card.Header>
        <div className="flex-row justify-between center-items">
          <span id='project-title'>{project.title} - {project.public ? 'Public' : 'Private'}</span>
          {project.owner === userId
            ? <ButtonGroup>
              <Share
                userId={userId}
                projectId={projectId}
                friends={friends}
                sharedWith={project.sharedWith}
                reload={reload}/>
              <ConfirmModal
                deleteTitle='Delete Project'
                deleteText='Are you sure you want to delete this project? All associated files with this project will be deleted as well.'
                cb={deleteProject}
                cbValue={projectId}
                reload={reload}
                outline={false}/>
            </ButtonGroup>
            : null
          }
        </div>
      </Card.Header>
      <Card.Body
        style={{
          backgroundColor: '#41393E'
        }}>
        <Card.Subtitle
          className="mb-2 text-muted"
          style={{
            fontSize: 'small'
          }}>
          {project.createdAt.toDate().toDateString()}
        </Card.Subtitle>
        <Card.Text>
          {project.description}
        </Card.Text>
        <Button
          size="sm"
          variant="primary"
          index={index}
          onClick={loadProject}>
            Open Project
        </Button>
        {/* <Button><Icon icon={'akar-icons:play'} /></Button> */}
      </Card.Body>
    </Card>
  );
};

export default ProjectView;