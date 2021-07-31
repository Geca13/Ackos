import React, { useEffect, useReducer } from 'react';
import * as authActions from '../redux/user/authentication/authActions';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';


const reducer = (state, action) => {
  if (action.type === 'loading-user') {
    return {
      ...state,
      isLoadingUser: true,
      userNotFound: false,
    };
  } else if (action.type === 'load-user-success') {
    return {
      ...state,
      isLoadingUser: false,
      user: action.payload,
    };
  } else if (action.type === 'load-user-failure') {
    return {
      ...state,
      isLoadingUser: false,
      userNotFound: true,
    };
  } else if (action.type === 'cancel') {
    let firstName = state.user.firstName;
    if (state.originalFirstName) {
      firstName = state.originalFirstName;
    }
    let lastName = state.user.lastName;
    if (state.originalLastName) {
      lastName = state.originalLastName;
    }
    let email = state.user.email;
    if (state.originalEmail) {
      email = state.originalEmail;
    }
    return {
      ...state,
      inEditMode: false,
      
      errors: {},
      user: {
        ...state.user,
        firstName,
        lastName,
        email
      },
      originalFirstName: undefined,
      originalLastName: undefined,
      originalEmail: undefined,
    };
  } else if (action.type === 'update-progress') {
    return {
      ...state,
      pendingUpdateCall: true,
    };
  } else if (action.type === 'update-success') {
    return {
      ...state,
      inEditMode: false,
      originalFirstName: undefined,
      originalLastName: undefined,
      originalEmail: undefined,
      pendingUpdateCall: false,
      user: {
        ...state.user,
        
      },
    };
  } else if (action.type === 'update-failure') {
    return {
      ...state,
      pendingUpdateCall: false,
      errors: action.payload,
    };
  } else if (action.type === 'update-firstName') {
    let originalFirstName = state.originalFirstName;
    if (!originalFirstName) {
        originalFirstName = state.user.firstName;
    }
    const errors = state.errors;
    errors.firstName = undefined;
    return {
      ...state,
      errors,
      originalFirstName,
      user: {
        ...state.user,
        firstName: action.payload,
      },
    };
} else if (action.type === 'update-lastName') {
    let originalLastName = state.originalLastName;
    if (!originalLastName) {
        originalLastName = state.user.lastName;
    }
    const errors = state.errors;
    errors.lastName = undefined;
    return {
      ...state,
      errors,
      originalLastName,
      user: {
        ...state.user,
        lastName: action.payload,
      },
    };
} else if (action.type === 'update-email') {
    let originalEmail = state.originalEmail;
    if (!originalEmail) {
        originalEmail = state.user.email;
    }
    const errors = state.errors;
    errors.email = undefined;
    return {
      ...state,
      errors,
      originalEmail,
      user: {
        ...state.user,
        email: action.payload,
      },
    };
  } else if (action.type === 'edit-mode') {
    return {
      ...state,
      inEditMode: true,
    };
  }
  return state;
};

const UserPage = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    userNotFound: false,
    isLoadingUser: false,
    inEditMode: false,
    originalFirstName: undefined,
    originalLastName: undefined,
    originalEmail: undefined,
    pendingUpdateCall: false,
    image: undefined,
    errors: {},
  });

  useEffect(() => {
    const loadUser = () => {
      const email = props.match.params.email;
      
      if (!email) {
        return;
      }
      dispatch({ type: 'loading-user' });
      authActions
        .getUser(props.match.params.email)
        .then((response) => {
          dispatch({ type: 'load-user-success', payload: response.data });
          console.log( response.data.id )
        })
        .catch((error) => {
          dispatch({ type: 'load-user-failure' });
        });
    };
    loadUser();
  }, [props.match.params.email]);

  const onClickSave = () => {
    const userId = props.loggedInUser.id;
    console.log(`dddd + ${userId}`)
    const userUpdate = {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      email: state.user.email,
      
    };
    dispatch({ type: 'update-progress' });
    authActions
      .updateUser(userId, userUpdate)
      .then((response) => {
        dispatch({ type: 'update-success' });
        const updatedUser = { ...state.user };
        
        const action = {
          type: 'update-success',
          payload: updatedUser,
        };
        props.dispatch(action);
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        dispatch({ type: 'update-failure', payload: errors });
      });
  };

 

  let pageContent;
  if (state.isLoadingUser) {
    pageContent = <Spinner />;
  } else if (state.userNotFound) {
    pageContent = (
      <div className="alert alert-danger text-center">
        <div className="alert-heading">
          <i className="fas fa-exclamation-triangle fa-3x" />
        </div>
        <h5>User not found</h5>
      </div>
    );
  } else {
    const isEditable =
      props.loggedInUser.email === props.match.params.email;
    pageContent = state.user && (
      <ProfileCard
        user={state.user}
        isEditable={isEditable}
        inEditMode={state.inEditMode}
        onClickEdit={() => dispatch({ type: 'edit-mode' })}
        onClickCancel={() => dispatch({ type: 'cancel' })}
        onClickSave={onClickSave}
        onChangeFirstName={(event) =>
          dispatch({ type: 'update-firstName', payload: event.target.value })
        }
        onChangeLastName={(event) =>
            dispatch({ type: 'update-lastName', payload: event.target.value })
          }
          onChangeEmail={(event) =>
            dispatch({ type: 'update-email', payload: event.target.value })
          }  
        pendingUpdateCall={state.pendingUpdateCall}
        
        errors={state.errors}
      />
    );
  }
  return (
    <div data-testid="userpage">
      <div className="row">
        <div className="col">{pageContent}</div>
        
      </div>
    </div>
  );
};
UserPage.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);
