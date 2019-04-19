import Vue from 'vue';

Vue.config.productionTip = false;

const sess = window.sessionStorage;
Vue.mixin({
    beforeRouteLeave(to ,from , next){
        console.log(to);
        const toRoute = to.path;
        const fromeRoute = from.path;
        const h = JSON.parse(sess.getItem(toRoute));
        if (h&&h.history) {
            this.$destroy();
            next();
        } else {
            next();
        }
        next();
    }
})

const beforeEach = function (to,from,next) {
    const toRoute = to.path;
    const fromeRoute = from.path;
    let h = JSON.parse(sess.getItem(toRoute));
    console.log(h);
    if (h&&h.history) {
        h.history = false;
        sess.removeItem(toRoute);
    } else {
        sess.setItem(fromeRoute || '/',JSON.stringify({
            history:true,
        }))
    }
    next();
}
beforeEach(beforeEach);