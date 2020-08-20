<?php
include_once("sql.php");
include_once("functions.php");
doHeader("Cosmos Quest");
doMenu();
$content='<h2>1.	General Information</h2>
 
<p>1.1.	Our page, URL: https://www.cosmosquest.net (the “Website”), uses a technology called “cookies” in order to collect information about the use of the Website, property of GAIABYTE, S.L. (“GaiaByte”).
</p> 
<p>1.2.	The purpose of this Cookies Policy is to inform you in a clear and precise manner about the cookies used on our Website (the “Cookies Policy”). If you wish to gather more information about the cookies we use on the Website, or if you have any comments or suggestions related to the use of cookies, do not hesitate to contact us at the following e-mail address: info at gaiabyte.com.
</p> 
<p>1.3.	For more information about our Website’s rules of use, and regarding how we use your personal information, please review GaiaByte’s Terms and Conditions of Use and Privacy Policy.
</p> 
<h2>2.	What is a Cookie?</h2>
 
<p>2.1.	A cookie is a file that downloads to your device (computer or mobile device). It stores data that can be updated and retrieved by GaiaByte in order to facilitate and enhance browsing on the Website.
</p> 
<p>2.2.	The information collected using cookies can include the date and time of visits to the Website, the pages viewed, how long you have been on our Website, and the sites visited right before and after it. 
</p> 
<h2>3.	What Kind of Cookies Do We Use on the Website?</h2>
 
<p>3.1.	Our Website uses the cookies described below:
</p> 
	<p>(i)	Proprietary Cookies</p>
 
<p>These cookies are sent to your computer from our own domain and are managed exclusively by us for optimal operation of the Website. The cookies used are technical and personalized, and the information we collect 
is used to enhance the quality of our service and your user experience. These cookies remain on your browser longer, allowing us to recognize you as a recurring visitor to the Website.
 </p>
	<p>(ii)	Third-Party Cookie Analytics</p> 
 
<p>Third-party cookies are sent to your computer from equipment or a domain that is not managed by GaiaByte but rather by another entity that processes data obtained using these cookies.
</p> 
<p>On our Website, we use a traffic measuring system called Google Analytics, a web analytics tool designed by Google that allows us to see how users interact on our Website. Moreover, it enables cookies on the domain of the site being browsed by the user and uses a set of cookies called "__utma" and "__utmz" to anonymously collect information and generate trend reports about the Website without identifying individual users.
</p> 
<p>Together with our server log files, the Google Analytics cookies allow us to see the total number of users visiting our Website and the most popular parts. In this manner, we obtain information that can help us enhance browsing and provide better service to users and clients. 
</p> 
<p>Below we include a link to the Google website where you can get a description of the types of cookies used by Google Analytics and their expiration dates:
<a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es">https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es</a> 
</p>
	<p>(iii)	Other Third-Party Cookies</p>
 
<p>If you interact with the content of our Website, third-party cookies can be installed (for example, when clicking on social network buttons or watching videos hosted on another web page). We cannot access data stored on cookies of other websites when you browse on those third-party sites.
</p> 
    <p>(iv)	 Flash Cookies (Also Known As Local Shared Objects)</p>
 
<p>On our Website, you may occasionally find content, video or product guides that use Adobe Flash Player for viewing. Adobe uses Flash cookies (also known as local shared objects) to help enhance your experience as a visitor. The Flash cookies are stored on your device in the same way as the cookies described above, but the browser manages them differently. If you wish to disable or eliminate Flash cookies, consult the Adobe manuals on how to manage local shared objects. Remember that if you disable the Website’s Flash cookies you may not be able to access certain kinds of site content, such as videos.
</p>
<h2>4.	How Do We Obtain Your Consent to Install Cookies?</h2>
 
<p>Based on what appears in your browser’s pop-up window when you access the Website for the first time, we assume you consent to the installation and our use of cookies by continuing to browse on our Website for the periods and under the terms and conditions contained in this Cookies Policy. 
</p> 
<h2>5.	Can I Withdraw My Consent to Installation of Cookies?</h2>
 
<p>5.1.	You can withdraw your consent to installation of cookies at any time. To remove the cookies stored on your device (computer or mobile device) you must do so using your Internet browser’s preferences and settings. 
</p> 
<p>5.2.	For more information about removing, disabling or blocking cookies please visit: <a href="http://www.aboutcookies.org/Default.aspx?page=2">http://www.aboutcookies.org/Default.aspx?page=2</a>
</p> 
<h2>6.	How Can I Disable and Block Cookies?</h2> 
 
<p>6.1.	Above, we explained that you could reject the installation of some or all cookies using your browser’s settings. The vast majority of browsers allow automatic detection and rejection of cookies. If you reject them, you may continue using our Website, but use of some of our services may be limited and result in a less satisfactory experience on our site. 
</p> 
<p>6.2.	For more information about how to adjust the cookie settings in the following browsers, please follow the relevant link:
</p> 
    <p>(i)	Internet Explorer: <a href="http://windows.microsoft.com/en-us/internet-explorer/delete-manage-cookies#ie=ie-10">http://windows.microsoft.com/en-us/internet-explorer/delete-manage-cookies#ie=ie-10</a>
 </p>
   <p>(ii)	Mozilla Firefox: <a href="http://support.mozilla.org/en-US/kb/Cookies">http://support.mozilla.org/en-US/kb/Cookies</a>
 </p>
   <p>(iii)	Google Chrome: <a href="http://support.google.com/chrome/bin/answer.py?hl=en&answer=95647">http://support.google.com/chrome/bin/answer.py?hl=en&answer=95647</a>
</p> 
   <p>(iv)	Safari</p>
 
         	</p>Windows: <a href="http://support.apple.com/kb/PH5042">http://support.apple.com/kb/PH5042</a></p>
         	</p>iOS: <a href="http://support.apple.com/kb/HT1677">http://support.apple.com/kb/HT1677</a></p>
 
<h2>7.	Changes to the Cookies Policy</h2> 
 
<p>We recommend you review this Cookies Policy each time you connect to our Website. Its content may change in the future so that it can be adapted to new legal requirements or to any cookies we may be using at any time. Regardless, we will notify you each time we substantially modify our Cookies Policy so that you are aware of the current version at all times.
</p>
';
doContent($content,"Cookies Policy");
doFooter();
?>