import React from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

const ProductCard = (props ) => {
  const { name, description, priceOnPack, priceOnPiece } = props.product

  const showEditButton = !props.isEditable && !props.inEditMode;

  return (
    <div className="card">
      <div className="card-header text-center">
        
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && <h4>{`${name } ${description}`}</h4>}
        {props.inEditMode && (
          <div className="mb-2">
            <Input
              value={name}
              label={`Change Name for ${name}`}
              onChange={props.onChangeName}
              hasError={props.errors.name && true}
              error={props.errors.name}
            />
            <div className="mt-2">
            <Input
              value={description}
              label={`Change Description for ${name}`}
              onChange={props.onChangeDescription}
              hasError={props.errors.description && true}
              error={props.errors.description}
            />
            </div>
            <div className="mt-2">
            <Input
              value={priceOnPack}
              label={`Change price on pack for ${name}`}
              onChange={props.onChangePriceOnPack}
              hasError={props.errors.priceOnPack && true}
              error={props.errors.priceOnPack}
            />
            </div>
            <div className="mt-2">
            <Input
              value={priceOnPiece}
              label={`Change price on pack for ${name}`}
              onChange={props.onChangePriceOnPiece}
              hasError={props.errors.priceOnPiece && true}
              error={props.errors.priceOnPiece}
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

ProductCard.defaultProps = {
  errors: {}
};

export default ProductCard;