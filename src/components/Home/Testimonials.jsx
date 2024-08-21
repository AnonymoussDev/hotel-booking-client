import TestimonialLogo from 'src/assets/images/testimonial-logo.png';

import OwlCarousel from 'react-owl-carousel';

const Testimonials = () => {
    return (
        <section className="testimonial-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <span>Testimonials</span>
                            <h2>What Customers Say?</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <OwlCarousel
                            //   style={{ position: "absolute", top: "0" }}
                            className="testimonial-slider owl-carousel"
                            items={1}
                            loop
                        >
                            <div className="ts-item">
                                <p>
                                    After a construction project took longer than expected, my husband, my daughter and
                                    I needed a place to stay for a few nights. As a Chicago resident, we know a lot
                                    about our city, neighborhood and the types of housing options available and
                                    absolutely love our vacation at Sona Hotel.
                                </p>
                                <div className="ti-author">
                                    <div className="rating">
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star-half_alt" />
                                    </div>
                                    <h5> - Alexander Vasquez</h5>
                                </div>
                                <img src={TestimonialLogo} alt="" />
                            </div>
                            <div className="ts-item">
                                <p>
                                    After a construction project took longer than expected, my husband, my daughter and
                                    I needed a place to stay for a few nights. As a Chicago resident, we know a lot
                                    about our city, neighborhood and the types of housing options available and
                                    absolutely love our vacation at Sona Hotel.
                                </p>
                                <div className="ti-author">
                                    <div className="rating">
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star" />
                                        <i className="icon_star-half_alt" />
                                    </div>
                                    <h5> - Alexander Vasquez</h5>
                                </div>
                                <img src={TestimonialLogo} alt="" />
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
