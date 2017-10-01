import template from './admin.html';
import styles from './admin.scss';

export default {
    template,
    controller
};

controller.$inject = ['userService'];

function controller(userService) {
    this.styles = styles;
    this.logout = () => userService.logout();
    this.isAuthenticated = () => userService.isAuthenticated();
    this.isAdmin = () => userService.isAdmin();
    this.isBrewer = () => userService.isBrewer();
}
