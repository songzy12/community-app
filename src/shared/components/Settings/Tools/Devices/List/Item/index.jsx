/**
 * render device item.
 */
import _ from 'lodash';
import React from 'react';
import PT from 'prop-types';
import ReactSVG from 'react-svg';
import cn from 'classnames';
import { isomorphy } from 'topcoder-react-utils';

import './styles.scss';

let assets;
if (isomorphy.isClientSide()) {
  assets = require.context('assets/images/tools/device-types', false, /svg/);
}

export default function Item(props) {
  const {
    device,
    index,
    isEditing,
    onDeleteItem,
    onEditItem,
  } = props;

  const hasModel = !_.isEmpty(device.model);
  const secondLine = device.deviceType + (device.manufacturer ? ` | ${device.manufacturer}` : '')
                                      + (device.operatingSystem ? ` | ${device.operatingSystem}` : '');

  return (
    <div styleName={cn('container', { isEditing })}>
      <div styleName="device-info">
        <div styleName="device-icon">
          { assets && assets.keys().includes(`./${device.deviceType.toLowerCase()}.svg`) ? <ReactSVG path={assets(`./${device.deviceType.toLowerCase()}.svg`)} /> : '' }
        </div>
        <div styleName="device-parameters">
          {hasModel ? (
            <div styleName="parameter-model">
              {device.model}
            </div>
          ) : null}
          <div styleName="parameter-second-line">
            {secondLine}
          </div>
        </div>
      </div>
      <div styleName="operation-container">
        <a
          styleName="edit"
          onKeyPress={() => onEditItem(index)}
          tabIndex={0}
          role="button"
          onClick={() => onEditItem(index)}
        >
          <img src={assets('./ico-edit.svg')} alt="edit-icon" />
          <p>
            Edit
          </p>
        </a>
        <a
          tabIndex={0}
          styleName="delete"
          role="button"
          onKeyPress={() => onDeleteItem(index)}
          onClick={() => onDeleteItem(index)}
        >
          <img src={assets('./trash.svg')} alt="delete-icon" />
          <p>
            Delete
          </p>
        </a>
      </div>
    </div>
  );
}

Item.propTypes = {
  device: PT.shape().isRequired,
  index: PT.number.isRequired,
  isEditing: PT.bool.isRequired,
  onDeleteItem: PT.func.isRequired,
  onEditItem: PT.func.isRequired,
};
