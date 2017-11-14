import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

import Dashboard from "../../views/Dashboard/";
import Charts from "../../views/Charts/";
import Widgets from "../../views/Widgets/";
import Buttons from "../../views/Components/Buttons/";
import Cards from "../../views/Components/Cards/";
import Forms from "../../views/Components/Forms/";
import Modals from "../../views/Components/Modals/";
import SocialButtons from "../../views/Components/SocialButtons/";
import Switches from "../../views/Components/Switches/";
import Tables from "../../views/Components/Tables/";
import Tabs from "../../views/Components/Tabs/";
import FontAwesome from "../../views/Icons/FontAwesome/";
import SimpleLineIcons from "../../views/Icons/SimpleLineIcons/";
import EditDb from "../../views/Datasource/Edit/EditDb";
import ListDb from "../../views/Datasource/List/ListDb";
import {createBrowserHistory} from "history";
import AddDb from "../../views/Datasource/Add/AddDb";
import ListTask from "../../views/Task/List/ListTask";
import AddTask from "../../views/Task/Add/AddTask";
import EditTask from "../../views/Task/Edit/EditTask";
import ListProcessed from "../../views/Processed/List/ListProcessed";

const history = createBrowserHistory();
class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <div className="container-fluid">
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                                <Route path="/components/cards" name="Cards" component={Cards}/>
                                <Route path="/components/forms" name="Forms" component={Forms}/>
                                <Route path="/components/modals" name="Modals" component={Modals}/>
                                <Route path="/components/social-buttons" name="Social Buttons"
                                       component={SocialButtons}/>
                                <Route path="/components/switches" name="Swithces" component={Switches}/>
                                <Route path="/components/tables" name="Tables" component={Tables}/>
                                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                                <Route path="/icons/simple-line-icons" name="Simple Line Icons"
                                       component={SimpleLineIcons}/>
                                <Route path="/widgets" name="Widgets" component={Widgets}/>
                                <Route path="/charts" name="Charts" component={Charts}/>
                                <Route path="/datasource/list" name="datasource-list" component={ListDb}/>
                                <Route path="/datasource/add" name="datasource-add" component={AddDb}/>
                                <Route path="/datasource/:id" name="datasource-edit" component={EditDb}/>
                                <Redirect from="/datasource" to="/datasource/list"/>

                                <Route path="/task/list" name="task-list" component={ListTask}/>
                                <Route path="/task/add" name="task-add" component={AddTask}/>
                                <Route path="/task/:id" name="task-edit" component={EditTask}/>
                                <Redirect from="/task" to="/task/list"/>

                                <Route path="/processed/list" name="processed-list" component={ListProcessed}/>
                                <Redirect from="/processed" to="/processed/list"/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </div>
                    </main>
                    <Aside />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;
