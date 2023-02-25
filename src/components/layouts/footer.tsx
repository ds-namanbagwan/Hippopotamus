import * as React from "react";
import "../../index.css";
import logofooter from "../../images/logo-footer.svg";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import twitter from "../../images/twitter.svg";
import youtube from "../../images/youtube.svg";
import printest from "../../images/printest.svg";
import { cookieText, cookiesUrl } from "../../../sites-global/global"
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../../sites-global/staticData";
import { useEffect, useState } from "react";
import Link from "../commons/Link";

const Footer = (props: any) => {
	// const { foo } = props;
	// const [isNavVisible, setNavVisibility] =  useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	// console.log(footer)
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");
		mediaQuery.addListener(handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = mediaQuery => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};
	// if (typeof window !== "undefined") {
	// 	mediaQuery = window?.innerWidth;
	// }


	return (
		<>

			<footer className="site-footer">

				<div className="container">

					<div className="store-locator" style={{marginLeft:"500px"}}>
					<div className="company-logo mr-4">
							<img src={props?._site?.c_headerlogo?.image.url} alt="logo"/>
							</div>
							</div>
							</div>
							
						{/* {data.c_store_finder.map((storfinder: any) => {
							console.log(storfinder)
							return (
								<>
									<div className="store-inner">
										<img src={storfinder.icon.url} alt="store-finder" />
										<Link props={storfinder.cTA}/>

									</div>
								</>
							)
						})}


						<div className="store-inner flex flex-raw">
							<div>
							<img src={footer.c_fAQs.icon.url} alt="faq-icon" />

							<Link props={footer.c_fAQs.cTA} />
							</div>
							<div>

							<img src={footer.c_getAQuate.icon.url} alt="faq-icon" />

							<Link props={footer.c_getAQuate.cTA} />
							</div>
						</div>
						

						




					</div>
					

					<div className="link-sec-footer ">
					{footer.c_customer_services?
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_customer_services.headerLinksHeading}</h4>
							<ul className="list-none">
								{footer.c_customer_services.headerLinks.map((customerService: any) => {
									return (<li>
											<Link props={customerService}/>
										</li>)
								})}
							</ul>
						</div>:''}
						{footer.c_about_matalan?
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_about_matalan.headerLinksHeading}</h4>
							<ul className="list-none"><li>{footer.c_about_matalan.headerLinksHeading}</li>
								{footer.c_about_matalan.headerLinks.map((aboutMatalan: any) => {
									return (<li>
										<Link props={aboutMatalan}/>
										</li>)
								})}
							</ul>
						</div>:''}
						{footer.c_our_website?
						<div className="footer-block">
							<h4 className="footer-block-title">{footer.c_our_website.headerLinksHeading}</h4>
							<ul className="list-none">
								{footer.c_our_website.headerLinks.map((ourWebsite: any) => {
									return (<li>
										<Link props={ourWebsite}/>
									</li>)
								})}
							</ul>
						</div>:''}
						<div className="footer-block">
						<ul className="social-media-bx">
							{footer.c_socialIcons.map((icon: any) => {
								return (

									<>
										<li className=""> <a href={icon.cTA.link} target="_blank"><img src={icon.icon.url} height="20" alt="social" width="21" className="inline-block w-5 h-auto" /> </a> </li>
									</>
								)
							})}
						</ul>
						</div>

					</div>
					<div className="copyright-bx">
						<span className="text-xs flex-wrap" data-copyright="">
							{footer.c_footerDescription}</span>

						
					</div>

						</div>*/}

			</footer>

			{/* <CookieConsent
				buttonText={"Accept"}
				buttonStyle={{
					marginLeft: "100px",
				}}
			>
				<p>
					{cookieText}
					<a className="text-cookies-link" href={cookiesUrl}>
						{StaticData.cookie}
					</a>
					.
				</p>
			</CookieConsent> */}
		</>
)}
export default Footer;
