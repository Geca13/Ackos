import React from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
  const { firstName, lastName, email } = props.user;

  const showEditButton = !props.isEditable && !props.inEditMode;

  return (
    <div className="card">
      <div className="card-header text-center">
        
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && <h4>{`${firstName } ${lastName}`}</h4>}
        {props.inEditMode && (
          <div className="mb-2">
            <Input
              value={firstName}
              label={`Change First Name for ${email}`}
              onChange={props.onChangeFirstName}
              hasError={props.errors.firstName && true}
              error={props.errors.firstName}
            />
            <div className="mt-2">
            <Input
              value={lastName}
              label={`Change Last Name for ${email}`}
              onChange={props.onChangeLastName}
              hasError={props.errors.lastName && true}
              error={props.errors.lastName}
            />
            </div>
            <div className="mt-2">
            <Input
              value={email}
              label={`Change email for ${email}`}
              onChange={props.onChangeEmail}
              hasError={props.errors.email && true}
              error={props.errors.email}
            />
            </div>
          </div>
        )}
        {showEditButton && (
          <button
            className="btn btn-outline-success"
            onClick={props.onClickEdit}
          >
            <i className="fas fa-user-edit" /> Edit
          </button>
        )}
        {props.inEditMode && (
          <div>
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={props.onClickSave}
              text={
                <span>
                  <i className="fas fa-save" /> Save
                </span>
              }
              pendingApiCall={props.pendingUpdateCall}
              disabled={props.pendingUpdateCall}
            />
            <button
              className="btn btn-outline-secondary ml-1"
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-window-close" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileCard.defaultProps = {
  errors: {}
};

export default ProfileCard;