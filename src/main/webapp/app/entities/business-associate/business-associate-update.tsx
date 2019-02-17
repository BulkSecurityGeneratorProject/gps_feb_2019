import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './business-associate.reducer';
import { IBusinessAssociate } from 'app/shared/model/business-associate.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessAssociateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBusinessAssociateUpdateState {
  isNew: boolean;
}

export class BusinessAssociateUpdate extends React.Component<IBusinessAssociateUpdateProps, IBusinessAssociateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { businessAssociateEntity } = this.props;
      const entity = {
        ...businessAssociateEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/business-associate');
  };

  render() {
    const { businessAssociateEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gpsNetraApp.businessAssociate.home.createOrEditLabel">Create or edit a BusinessAssociate</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : businessAssociateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="business-associate-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="baNameLabel" for="baName">
                    Ba Name
                  </Label>
                  <AvField
                    id="business-associate-baName"
                    type="text"
                    name="baName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="baAbbrLabel" for="baAbbr">
                    Ba Abbr
                  </Label>
                  <AvField
                    id="business-associate-baAbbr"
                    type="text"
                    name="baAbbr"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="baNbrLabel" for="baNbr">
                    Ba Nbr
                  </Label>
                  <AvField id="business-associate-baNbr" type="text" name="baNbr" />
                </AvGroup>
                <AvGroup>
                  <Label id="baDunsNbrLabel" for="baDunsNbr">
                    Ba Duns Nbr
                  </Label>
                  <AvField id="business-associate-baDunsNbr" type="text" name="baDunsNbr" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/business-associate" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  businessAssociateEntity: storeState.businessAssociate.entity,
  loading: storeState.businessAssociate.loading,
  updating: storeState.businessAssociate.updating,
  updateSuccess: storeState.businessAssociate.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociateUpdate);
