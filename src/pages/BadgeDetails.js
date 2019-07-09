import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import './styles/BadgeDetails.css';
import confLogo from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

function BadgeDetails(props){
    const badge = props.badge;
    return( 
        <div>
                <div className="BadgeDetails__hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <img src={confLogo}/>
                            </div>
                            <div className="col-6 BadgeDetails__hero-attendant-name">
                                <h1>
                                    {`${badge.firstName} ${badge.lastName}`}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-8">
                        <Badge  firstName={badge.firstName || 'FIRST_NAME'}
                                        lastName={badge.lastName || 'LAST_NAME'}
                                        jobTitle={badge.jobTitle || 'JOB_TITLE'} 
                                        twitter={badge.twitter || 'twitter'}
                                        email={badge.email || 'email@email.com'}
                                        footerMsg={badge.hashtag || '#hasttag'} />
                        </div>
                        <div className="col-4 BadgeDetails__buttons">
                            <Link to={`/badges/${badge.id}/edit`} className="btn btn-primary">Edit</Link>
                            <button onClick={props.onOpenModal} className="btn btn-danger">Delete</button>
                            <DeleteBadgeModal onClose={props.onCloseModal} 
                                              isOpen={props.modalIsOpen}
                                              onDeleteBadge={props.onDeleteBadge}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default BadgeDetails;