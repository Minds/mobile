import { TabsComponent } from './src/modules/tabs/tabs.component';
import { NewsfeedSingleComponent } from './src/modules/newsfeed/single.component';
import { ChannelComponent } from './src/modules/channel/channel.component';
import { LoginComponent } from './src/modules/auth/login.component';

export const routes = [
    { path: "", redirectTo: "/login", pathMatch: "full", terminal: true },
    { path: "login", component: LoginComponent },
    { path: "tab/:id", component: TabsComponent },
    { path: "newsfeed/:id", component: NewsfeedSingleComponent },
    { path: "channel/:id", component: ChannelComponent }
];
