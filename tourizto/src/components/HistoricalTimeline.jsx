import React, { useState } from 'react';
import './HistoricalTimeline.css';

const HistoricalTimeline = ({ place }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  // Get timeline events based on place category
  const getTimelineEvents = () => {
    // Default timeline for places without specific data
    const defaultTimeline = [
      {
        id: 1,
        year: "1818",
        title: "Holkar Dynasty",
        description: "Indore became the capital of the Holkar state under Malhar Rao Holkar, who was granted the territory by the Peshwas.",
        image: null
      },
      {
        id: 2,
        year: "1948",
        title: "Integration with India",
        description: "After India's independence, Indore State was integrated into Madhya Bharat, which later became part of Madhya Pradesh in 1956.",
        image: null
      },
      {
        id: 3,
        year: "1960s",
        title: "Industrial Growth",
        description: "Indore began to emerge as an industrial center with textile mills and other industries being established.",
        image: null
      },
      {
        id: 4,
        year: "2000s",
        title: "IT and Education Hub",
        description: "Indore developed as an IT and education hub with the establishment of IIT, IIM, and various technology parks.",
        image: null
      }
    ];
    
    // Historical places timeline
    if (place.category === 'historical') {
      if (place.name.includes('Rajwada')) {
        return [
          {
            id: 1,
            year: "1747",
            title: "Construction Begins",
            description: "Construction of Rajwada Palace was initiated by the Holkar dynasty founders.",
            image: null
          },
          {
            id: 2,
            year: "1766",
            title: "Completion",
            description: "The seven-story palace was completed, showcasing a unique blend of Maratha and Mughal architectural styles.",
            image: null
          },
          {
            id: 3,
            year: "1801",
            title: "Expansion",
            description: "Maharani Ahilyabai Holkar expanded the palace and added more architectural elements.",
            image: null
          },
          {
            id: 4,
            year: "1984",
            title: "Fire Damage",
            description: "A major fire damaged parts of the palace, particularly the upper wooden structures.",
            image: null
          },
          {
            id: 5,
            year: "2006",
            title: "Restoration",
            description: "Major restoration work was undertaken to preserve this historical monument.",
            image: null
          }
        ];
      } else if (place.name.includes('Lal Bagh')) {
        return [
          {
            id: 1,
            year: "1886",
            title: "Construction Begins",
            description: "Maharaja Shivaji Rao Holkar initiated the construction of Lal Bagh Palace.",
            image: null
          },
          {
            id: 2,
            year: "1921",
            title: "Completion",
            description: "The palace was completed after 35 years of construction, becoming one of the grandest buildings in Indore.",
            image: null
          },
          {
            id: 3,
            year: "1930s",
            title: "Royal Residence",
            description: "The palace served as the residence of the Holkar rulers and hosted many royal receptions.",
            image: null
          },
          {
            id: 4,
            year: "1978",
            title: "Government Acquisition",
            description: "The palace was acquired by the government and later converted into a museum.",
            image: null
          },
          {
            id: 5,
            year: "2000s",
            title: "Tourist Attraction",
            description: "Lal Bagh Palace became one of Indore's major tourist attractions, showcasing the royal heritage.",
            image: null
          }
        ];
      }
    }
    
    // Religious places timeline
    else if (place.category === 'religious') {
      if (place.name.includes('Kanch Mandir')) {
        return [
          {
            id: 1,
            year: "1903",
            title: "Conception",
            description: "Sir Seth Hukumchand Jain conceived the idea of a temple made entirely of glass and mirrors.",
            image: null
          },
          {
            id: 2,
            year: "1905",
            title: "Construction Begins",
            description: "Construction of the Kanch Mandir (Glass Temple) began under the patronage of Sir Seth Hukumchand Jain.",
            image: null
          },
          {
            id: 3,
            year: "1912",
            title: "Completion",
            description: "The temple was completed with intricate glasswork covering walls, ceilings, floors, and pillars.",
            image: null
          },
          {
            id: 4,
            year: "1950s",
            title: "Renovations",
            description: "Major renovations were carried out to preserve the delicate glasswork and mirror mosaics.",
            image: null
          },
          {
            id: 5,
            year: "2010",
            title: "Heritage Status",
            description: "The temple was recognized as an important heritage site and religious landmark of Indore.",
            image: null
          }
        ];
      }
    }
    
    // Return default timeline for other places
    return defaultTimeline;
  };
  
  const timelineEvents = getTimelineEvents();
  
  // Toggle expanded event
  const toggleEvent = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  return (
    <div className="historical-timeline">
      <div className="timeline-header">
        <h3>Historical Timeline</h3>
        <p>Discover the rich history and evolution of {place.name} through time</p>
      </div>
      
      <div className="timeline-container">
        {timelineEvents.map((event, index) => (
          <div 
            className={`timeline-event ${expandedEvent === event.id ? 'expanded' : ''}`} 
            key={event.id}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content" onClick={() => toggleEvent(event.id)}>
              <div className="timeline-year">{event.year}</div>
              <div className="timeline-details">
                <h4>{event.title}</h4>
                <p className={expandedEvent === event.id ? 'expanded-description' : ''}>
                  {event.description}
                </p>
                {event.image && (
                  <div className="timeline-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="timeline-line"></div>
      </div>
      
      <div className="timeline-footer">
        <p>Click on any event to learn more</p>
      </div>
    </div>
  );
};

export default HistoricalTimeline;
