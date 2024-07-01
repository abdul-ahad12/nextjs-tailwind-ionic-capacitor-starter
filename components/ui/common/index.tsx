// GMAPS
import MapComponent from './GMaps/Maps';
import SearchComponent from './GMaps/Search';
import { soothingDarkMapStyle } from './GMaps/style';

// AUTHENTICATION
import ImageCarousel from './Authentication/ImageCarousel';
import OTPInput from './Authentication/OtpInputs';
import Authentication from './Authentication';

// Layouts
import BackAndButton from './Layouts/BackAndButton';
import HeightFullLayout from './Layouts/HeightFullLayout';
import CustomerActivityHeader from './Layouts/CustomerActivityHeader';
import OnBoardingLayout from './Layouts/OnBoardingLayout';
import Tabs from './Layouts/TabsBooking';

//Activity
import AccountComp from './Activity/AccountComp';
import BasicReport from './Activity/BasicReport';
import Inspection from './Activity/Inspection';
import BorderTextNumber from './Activity/resuable/BorderTextNumber';
import IconTextButton from './Activity/resuable/IconTextButton';
import ImageWithText from './Activity/resuable/ImageWithText';
import SingleNotifications from './Activity/resuable/SingleNotification';

// Input Field Generator

import {DynamicFieldsGenerate} from "./FormElements/DynamicFieldGenerate"
import InputComponent from "./FormElements"


export {
  ImageCarousel,
  OTPInput,
  MapComponent,
  SearchComponent,
  soothingDarkMapStyle,
  Authentication,
  BackAndButton,
  CustomerActivityHeader,
  HeightFullLayout,
  OnBoardingLayout,
  Tabs,
  AccountComp,
  BasicReport,
  BorderTextNumber,
  IconTextButton,
  ImageWithText,
  Inspection,
  SingleNotifications,
  DynamicFieldsGenerate,
  InputComponent
};
