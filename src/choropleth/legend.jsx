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
    ).isRequired
};

const defaultProps = {
    position: "bottomleft"
};

class ChoroplethLegend extends MapControl {
    componentWillMount() {
        const leafletElement = L.control(this.props);

        leafletElement.onAdd = function() {
            const container = L.DomUtil.create("div", "geo-choropleth-legend");
            leafletElement._container = container;
            return container;
        };

        this.leafletElement = leafletElement;
    }

    componentDidUpdate() {
        super.componentDidUpdate();

        const {extents} = this.props;

        this.leafletElement._container.innerHTML = extents.reduce((memo, e) => {
            return memo + `
                    <i style=${"background:" + e.color}></i> ${e.extent.join("-")} <br/>
                `;
        }, "");
    }
}

ChoroplethLegend.propTypes = propTypes;
ChoroplethLegend.defaultProps = defaultProps;

module.exports = ChoroplethLegend;