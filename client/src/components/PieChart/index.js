import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from '@mui/material';

const PieChart = ({ data, title }) => {
    return (
        <div style={{ height: "600px", width: "600px" }}> {/* Increase the height and width */}
            <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
                {title}
            </Typography>
            <ResponsivePie
                data={data}
                margin={{ top: 80, right: 120, bottom: 120, left: 120 }} // Adjusted margin for a larger view
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={12} // Slightly increased for better interaction
                colors={{ scheme: 'nivo' }} // Using a built-in color scheme
                borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={3} // Slightly thicker labels for better visibility
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70, // Adjust for larger size
                        itemsSpacing: 5, // More spacing between legend items
                        itemWidth: 150, // Wider legend items
                        itemHeight: 24, // Taller legend items for better readability
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 24, // Larger symbol size
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000',
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default PieChart;
