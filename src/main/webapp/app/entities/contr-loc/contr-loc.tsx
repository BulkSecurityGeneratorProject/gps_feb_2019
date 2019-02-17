import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contr-loc.reducer';
import { IContrLoc } from 'app/shared/model/contr-loc.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContrLocProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ContrLoc extends React.Component<IContrLocProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contrLocList, match } = this.props;
    return (
      <div>
        <h2 id="contr-loc-heading">
          Contr Locs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Contr Loc
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Effective From Date</th>
                <th>Effective To Date</th>
                <th>Updater</th>
                <th>Update Time Stamp</th>
                <th>Business Unit</th>
                <th>Contract</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contrLocList.map((contrLoc, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contrLoc.id}`} color="link" size="sm">
                      {contrLoc.id}
                    </Button>
                  </td>
                  <td>{contrLoc.type}</td>
                  <td>{contrLoc.quantity}</td>
                  <td>
                    <TextFormat type="date" value={contrLoc.effectiveFromDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={contrLoc.effectiveToDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{contrLoc.updater}</td>
                  <td>
                    <TextFormat type="date" value={contrLoc.updateTimeStamp} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{contrLoc.businessUnit}</td>
                  <td>{contrLoc.contractId ? <Link to={`contract/${contrLoc.contractId}`}>{contrLoc.contractId}</Link> : ''}</td>
                  <td>
                    {contrLoc.locationLocationNbr ? (
                      <Link to={`measurement-station/${contrLoc.locationId}`}>{contrLoc.locationLocationNbr}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contrLoc.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contrLoc.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contrLoc.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contrLoc }: IRootState) => ({
  contrLocList: contrLoc.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContrLoc);
