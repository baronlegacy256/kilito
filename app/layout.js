import NextTopLoader from "nextjs-toploader";
import LoginModal from "@/components/Home/LoginModal";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Kili to Savanna: Tanzania Safari: Tailor-made Trips and Stays",
  description:
    "Kili to Savanna is a Tanzanian safari company which provides high quality travel and tour services from the heights of Mt Kilimanjaro, to plains of Serengeti, Seeing the wildlife of mesmerizing beauty highest and small mountains, parks as well as beautiful beaches. Enjoy beautiful wildlife parks and amazing nature. Generosity and love is our vision. Proudly united by Swahili language.",

  openGraph: {
    siteName: "Kili To Savanna",
    type: "website",
    locale: "en_US",
    url: "https://kilitosavannaadventures.com/",
    title: "Kili to Savanna: Tanzania Safari: Tailor-made Trips and Stays",
    description:
      "Kili to Savanna is a Tanzanian safari company which provides high quality travel and tour services from the heights of Mt Kilimanjaro, to plains of Serengeti, Seeing the wildlife of mesmerizing beauty highest and small mountains, parks as well as beautiful beaches. Enjoy beautiful wildlife parks and amazing nature. Generosity and love is our vision. Proudly united by Swahili language.",
    images: [
      {
        url: "/assets/images/home/logo.png",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <NextTopLoader 
          color="#0277bd"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0277bd,0 0 5px #0277bd"
        />
        <div className="container">{children}</div>

        <div id="main-spinner" style={{display: "none"}}>
          <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        </div>

        <LoginModal />


        <Script type="text/javascript" id="validation-messages-1">
          {`
          var firstName_error_required = "Please enter your first name";
          var firstName_error_frenchName = "Your first name can only contain letters";
          var lastName_error_required = "Please enter your last name";
          var lastName_error_frenchName = "Your last name can only contain letters";
          var phone_error_required = "Please enter your phone number";
          var phone_error_phone = "Your phone number must be in the format 6XXXXXXXXX";
          var email_error_required = "Please enter your email";
          var email_error_email = "Your email must be valid";
          var password_error = "Please enter a password";
          var password2_error_required = "Please enter your password again";
          var password2_error_equalTo = "Passwords do not match";
          var isCguAccepted_error = "Please accept the Terms of Use and Specific Provider Conditions";
          var accountType_error = "Please select an account type";
          var confirm_message = 'Warning, once validated, you will no longer be able to change your profile type. Have you properly selected the most suitable one?';
          `}
        </Script>

        <Script type="text/javascript" id="validation-messages-2">
          {`
          var default_required = "This field is required.";
          var default_remote = "Please fill in this field to continue.";
          var default_email = "Please enter a valid email address.";
          var default_url = "login/auth.html";
          var default_date = "Please enter a valid date.";
          var default_dateISO = "Please enter a valid date (ISO).";
          var default_number = "Please enter a valid number.";
          var default_digits = "Please enter (only) a numeric value.";
          var default_creditcard = "Please enter a valid credit card number.";
          var default_equalTo = "Please enter the same value again.";
          var default_accept = "Please enter a value with a valid extension.";
          var default_maxlength = "Please do not enter more than {0} characters.";
          var default_minlength = "Please enter at least {0} characters.";
          var default_rangelength = "Please enter between {0} and {1} characters.";
          var default_range = "Please enter a value between {0} and {1}.";
          var default_max = "Please enter a value less than or equal to {0}.";
          var default_min = "Please enter a value greater than or equal to {0}.";
          var default_fileNameNoExt = "Invalid file name";
          `}
        </Script>



        <Script type="text/javascript" id="departure-date-error">
          {`
          var researchDepartureDateError = 'Please select a date later than today';
          `}
        </Script>

        <Script type="text/javascript" id="booking-errors">
          {`
          var roomCategoryId_error = "Please select a room category.";
          var nbParticipants_error = "Please select a number of participants.";
          var participantType_error = "Please select a number of participants";
          var startingDate_error = "Please enter a date in DD/MM/YYYY format.";
          var endingDate_error = "Please enter a date in DD/MM/YYYY format later than the start date.";
          var endingDate_greaterThan_error = "Please enter an end date later than the start date";
          var levelRequiredType_error = "Please select your level.";
          var selectedActivityId_error = "Please select an activity from the list";
          var comment_error = "Please enter a text of less than 10000 characters or leave the field empty.";
          var participantLastName_error = "Please enter a valid name (Letters and spaces).";
          var participantFirstName_error = "Please enter a valid first name (Letters and spaces).";
          var participantTel_error = "Please enter a number in the format 0123456789.";
          var participantEmail_error = "Please enter a valid email address.";
          var acceptCGU_error = "Please accept the general terms of use.";
          var isSpecificDemand = "";
          `}
        </Script>

        
      </body>
    </html>
  );
}
