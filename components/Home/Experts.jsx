import React from 'react'

function Experts() {
  return (
    <div id="best-experts-zone" className="full-width-div vignettes-zone">
                <h2 className="lvl1-zone-title">
                    Our Field Experts
                    <div className="lvl1-zone-subtitle">
                        They design your stays and make you experience exceptional moments
                    </div>
                </h2>

                <div id="best-experts-list-placeholder"
                    className="full-width-div cards-list-placeholder landing-placeholder"
                    data-endpoint="/userPro/listBestExperts" data-sport-id="33" data-country-id="" data-region-id=""
                    data-sub-region-id="" data-activity-star-category-id="">

                    <div className="cards-placeholder">
                        <div className="row">
                            <div className="card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="lazy-placeholder">
                                </div>
                            </div>
                            <div className="card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="lazy-placeholder">
                                </div>
                            </div>
                            <div className="card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="lazy-placeholder">
                                </div>
                            </div>
                            <div className="card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="lazy-placeholder">
                                </div>
                            </div>
                            <div className="card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                <div className="lazy-placeholder">
                                </div>
                            </div>
                        </div>
                        <div className="card-placeholder fake-card-placeholder col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <div className="lazy-placeholder">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
  )
}

export default Experts