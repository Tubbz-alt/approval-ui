import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Bullseye, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { fetchWorkflows, removeWorkflows } from '../../redux/actions/workflow-actions';

const RemoveWorkflowModal = ({
  history: { goBack, push },
  location: { state: { checkedWorkflows }},
  removeWorkflows,
  fetchWorkflows
}) => {
  if (!checkedWorkflows || checkedWorkflows.length === 0) {
    return null;
  }

  const onSubmit = () => removeWorkflows(checkedWorkflows)
  .then(() => {
    fetchWorkflows();
    push('/workflows');
  });

  const onCancel = () => goBack();

  return (
    <Modal
      isOpen
      isSmall
      title = { '' }
      onClose={ onCancel }
      actions={ [
        <Button key="cancel" variant="secondary" type="button" onClick={ onCancel }>
          Cancel
        </Button>,
        <Button key="submit" variant="primary" type="button" onClick={ onSubmit }>
          Confirm
        </Button>
      ] }
    >
      <Bullseye>
        <TextContent>
          <Text component={ TextVariants.h1 }>
            { `Removing ${checkedWorkflows.length} Workflows` }
          </Text>
        </TextContent>
      </Bullseye>
    </Modal>
  );
};

RemoveWorkflowModal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.func.isRequired
  }).isRequired,
  removeWorkflows: PropTypes.func.isRequired,
  fetchWorkflows: PropTypes.func.isRequired,
  checkedWorkflows: PropTypes.array
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWorkflows,
  removeWorkflows
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(RemoveWorkflowModal));
