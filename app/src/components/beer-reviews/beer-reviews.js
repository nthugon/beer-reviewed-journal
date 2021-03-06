import template from './beer-reviews.html';
import styles from './beer-reviews.scss';

export default {
    template,
    bindings: { 
        beer: '<'
    },
    controller
};

controller.$inject = ['$state'];

function controller($state) {
    this.styles = styles;

    this.backToBeers = () => {
        $state.go('beers');
    };

}


