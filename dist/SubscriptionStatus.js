Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const localization = {
    en: {
        messageFree: "You're on the Free Plan.",
        messagePro: "You're on the Pro Plan.",
        linkTextFree: "Upgrade",
        linkTextPro: "Manage"
    },
    de: {
        messageFree: "Du bist auf dem freien Plan.",
        messagePro: "Du bist auf dem Pro Plan.",
        linkTextFree: "Aktualisierung",
        linkTextPro: "Verwalten"
    },
    es: {
        messageFree: "Estás en el plan gratuito.",
        messagePro: "Estás en el Plan Pro.",
        linkTextFree: "Mejora",
        linkTextPro: "Administrar"
    },
    fr: {
        messageFree: "Vous êtes sur le plan gratuit.",
        messagePro: "Vous êtes sur le plan Pro.",
        linkTextFree: "Améliorer",
        linkTextPro: "Gérer"
    }
};

function SubscriptionStatus(props) {
    const locale = props.locale
        ? props.locale
        : "en";
    const proHref = props.powerupId
        ? `https://www.optro.cloud/app/${props.powerupId}`
        : "https://www.optro.cloud";
    if (props.isPro) {
        return (React.createElement("div", { className: "license-display license-display-pro" },
            React.createElement("span", null, localization[locale].messageFree),
            React.createElement("a", { className: "license-display-link", href: proHref, target: proHref !== "#" ? "_blank" : undefined, onClick: props.onGetPro }, localization[locale].linkTextFree)));
    }
    else {
        return (React.createElement("div", { className: "license-display license-display-free" },
            React.createElement("span", null, localization[locale].messagePro),
            React.createElement("a", { className: "license-display-link", href: "https://www.optro.cloud/account", target: "_blank" }, localization[locale].linkTextPro)));
    }
}

exports.SubscriptionStatus = SubscriptionStatus;
//# sourceMappingURL=SubscriptionStatus.js.map
