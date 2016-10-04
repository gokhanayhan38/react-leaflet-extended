"use strict";

const {PropTypes} = require("react");
const {MapControl} = require("react-leaflet");
const L = require("leaflet");

const propTypes = {
    extents: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            extent: PropTypes.arrayOf(
                PropTypes.number.isRequired
            ).isRequired
        }).isRequired
    ),
    visibility: PropTypes.bool
};

const defaultProps = {
    position: "bottomleft",
    visibility: false
};

class ChoroplethLegendControl extends MapControl {
    componentWillMount() {
        const leafletElement = L.control(this.props);

        leafletElement.onAdd = function() {
            const container = L.DomUtil.create("div", "geo-choropleth-legend visibility-hidden");
            leafletElement._container = container;
            return container;
        };

        this.leafletElement = leafletElement;
    }

    componentDidUpdate(prevProps={} /*: object */) {
        super.componentDidUpdate(prevProps);
        this.update();
    }

    update() {
        const {visibility, extents} = this.props;

        if (visibility) {
            this.leafletElement._container.innerHTML = extents.reduce((memo, e) => {
                return memo + `
                    <i style=${"background:" + e.color}></i> ${e.extent.join("-")} <br/>
                `;
            }, "");

            L.DomUtil.removeClass(this.leafletElement._container, "visibility-hidden");
        }
        else {
            this.leafletElement._container.innerHTML = "";
            L.DomUtil.addClass(this.leafletElement._container, "visibility-hidden");
        }
    }
}

ChoroplethLegendControl.propTypes = propTypes;
ChoroplethLegendControl.defaultProps = defaultProps;

module.exports = ChoroplethLegendControl;
