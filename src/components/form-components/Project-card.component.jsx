import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showModal, closeModal } from '../../utils/modal-control.utils'
import RenameProject from '../../containers/projects-module/Rename-project.container'
import {
  deleteProject,
  highlightProject,
  selectProjectToDispatch,
  getAllProjects
} from '../../redux/actions/projects-actions/project.actions'
import DeleteWarning from '../warnings/Delete-warning'

const ProjectCards = ({
  project,
  deleteProject,
  saving,
  highlightProject,
  highlightedProject,
  selectProjectToDispatch,
  getAllProjects,
  permissions
}) => {
  const onDeleteProject = () => {
    deleteProject(highlightedProject._id, () => {
      getAllProjects(1, () => {
        closeModal('#delete-project')
      })
      closeModal('#delete-project')
    })
  }

  return (
    <React.Fragment>
      <li className='card-list-item card-deco'>
        <Link
          to={
            permissions.includes('Projects_View_Project')
              ? `/view-project/${project._id}`
              : '#'
          }
          className='card'
        >
          <p className='top-info'>
            Created {moment(project.createdAt).fromNow()} by{' '}
            {project.createdBy.firstName}
          </p>
          <h3
            uk-tooltip={`title: ${project.name}; pos: bottom`}
            className='card-title capitalize uk-text-truncate'
          >
            {project.name}
          </h3>
        </Link>
        <div className='border-top card-footer d-flx-alc-jsb pl-1'>
          <p>{project.dispatches.length} Dispatch</p>
          <div>
            <Link
              data-uk-tooltip='title: Create dispatch; pos: bottom'
              onClick={() => selectProjectToDispatch(project)}
              to={'/new-dispatch'}
              className={
                permissions.includes('Dispatches_Create_Dispatch')
                  ? 'btn-icon'
                  : 'btn-icon disabled'
              }
            >
              <svg height='20px' width='20px'>
                <use href='/uploads/icons.svg#send' />
              </svg>
            </Link>
            <div className='uk-inline '>
              <button
                onClick={() => {
                  highlightProject(project)
                }}
                className='d-flx-alc-jsc btn-icon'
                type='button'
              >
                <svg>
                  <use xlinkHref='/uploads/icons.svg#more' />
                </svg>
              </button>
              <div
                uk-dropdown='mode: click; pos: bottom-right'
                className='drop-wrapper px-1h my-0 uk-dropdown'
              >
                <ul className='drop-lists none my-0'>
                  <li className='drop-list-item'>
                    <a
                      href='#'
                      className={
                        permissions.includes('Projects_Edit_Project')
                          ? ''
                          : 'disabled'
                      }
                      onClick={() => {
                        showModal('#rename-form')
                      }}
                    >
                      Rename project
                    </a>
                    <div id='rename-form' data-uk-modal className='uk-modal'>
                      <RenameProject
                        id={highlightedProject._id}
                        initialName={highlightedProject.name}
                      />
                    </div>
                  </li>
                  <li>
                    <a
                      href='#'
                      onClick={() => showModal('#delete-project')}
                      className={
                        permissions.includes('Projects_Delete_Project')
                          ? 'co-warning drop-del'
                          : 'co-warning drop-del disabled'
                      }
                    >
                      delete project
                    </a>

                    <div id='delete-project' data-uk-modal className='uk-modal'>
                      <div className='uk-modal-dialog uk-margin-auto-vertical border-radius'>
                        <DeleteWarning
                          deleteAction={onDeleteProject}
                          target={'this project'}
                          boolean={saving}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  saving: state.projects.savingProject,
  highlightedProject: state.projects.highlightedProject
})

export default connect(mapStateToProps, {
  deleteProject,
  highlightProject,
  selectProjectToDispatch,
  getAllProjects
})(ProjectCards)
