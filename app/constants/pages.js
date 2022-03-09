import Welcome from 'routes/Welcome';
import ColorScheme from 'routes/Welcome/ColorScheme';
import Explain from 'routes/Welcome/Explain';
import ReflectionPoints from 'routes/Welcome/ReflectionPoints';

import SignUp from 'routes/Auth/SignUp';
import SMSVerification from 'routes/Auth/SMSVerification';
import SignUpProfile from 'routes/Auth/Profile';
import SignUpWelcome from 'routes/Auth/Welcome';

import Feed from 'routes/Feed/Social';
import SendRequest from 'routes/Feed/SendRequest';
import Profile from 'routes/Profile';
import OtherProfile from 'routes/Feed/Social/OtherProfile';

import ManageTrustNetwork from 'routes/Feed/Network/List';
import EditTrustNetwork from 'routes/Feed/Network/Edit';
import AddTrustNetwork from 'routes/Feed/Network/Create';
import AddFriendToMyNetwork from 'routes/Feed/Network/Add';

import Timeline from 'routes/Timeline';

import Add from 'routes/Add';
import AddValue from 'routes/Add/AddValue';
import CreateValue from 'routes/Add/AddValue/CreateValue';
import AddManual from 'routes/Add/AddManual';
import CreateManual from 'routes/Add/AddManual/CreateManual';
import AddNeed from 'routes/Add/AddNeed';
import CreateNeed from 'routes/Add/AddNeed/CreateNeed';
import AddEmotion from 'routes/Add/AddEmotion';
import CreateEmotion from 'routes/Add/AddEmotion/CreateEmotion';
import EmotionPicker from 'routes/Add/AddEmotion/EmotionPicker';
import AddGoal from 'routes/Add/AddGoal';
import CreateGoal from 'routes/Add/AddGoal/CreateGoal';
import ManageGoal from 'routes/Add/AddGoal/ManageGoal';
import TapToCount from 'routes/Add/TapToCount';
import InputTap from 'routes/Add/TapToCount/InputTap';
import AddFeedback from 'routes/Add/AddFeedback';
import CreateFeedback from 'routes/Add/AddFeedback/CreateFeedback';
import AddCongrats from 'routes/Add/AddCongrats';

import Analyze from 'routes/Analyze';
import UserSearch from 'routes/UserSearch';

import Feedback from 'routes/Feedback';
import ReviewSent from 'routes/Feedback/Review';

const pages = [
  { key: 'welcome', component: Welcome },
  { key: 'welcome.theme', component: ColorScheme },
  { key: 'welcome.reflectionpoints', component: ReflectionPoints },
  { key: 'welcome.explain', component: Explain },
  { key: 'auth.signup', component: SignUp },
  { key: 'auth.sms', component: SMSVerification },
  { key: 'auth.welcome', component: SignUpWelcome },
  { key: 'auth.profile', component: SignUpProfile },
  { key: 'add', component: Add },
  { key: 'add.value', component: AddValue },
  { key: 'add.value.create', component: CreateValue },
  { key: 'add.manual', component: AddManual },
  { key: 'add.manual.create', component: CreateManual },
  { key: 'add.need', component: AddNeed },
  { key: 'add.need.create', component: CreateNeed },
  { key: 'add.emotion', component: AddEmotion },
  { key: 'add.emotion.picker', component: EmotionPicker },
  { key: 'add.emotion.create', component: CreateEmotion },
  { key: 'add.goal', component: AddGoal },
  { key: 'add.goal.create', component: CreateGoal },
  { key: 'add.goal.manage', component: ManageGoal },
  { key: 'add.tap', component: TapToCount },
  { key: 'add.tap.input', component: InputTap },
  { key: 'add.feedback', component: AddFeedback },
  { key: 'add.feedback.create', component: CreateFeedback },
  { key: 'add.congrats', component: AddCongrats },
  { key: 'feed', component: Feed },
  { key: 'feed.contact', component: SendRequest },
  { key: 'feed.profile', component: OtherProfile },
  { key: 'feed.network', component: ManageTrustNetwork },
  { key: 'feed.network.edit', component: EditTrustNetwork },
  { key: 'feed.network.create', component: AddTrustNetwork },
  { key: 'feed.network.add', component: AddFriendToMyNetwork },
  { key: 'feedback', component: Feedback },
  { key: 'feedback.review.sent', component: ReviewSent },
  { key: 'timeline', component: Timeline },
  { key: 'analyze', component: Analyze },
  { key: 'profile', component: Profile },
  { key: 'user.search', component: UserSearch }
];

export default pages;
