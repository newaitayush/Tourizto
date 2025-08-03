import React, { useState, useEffect } from 'react';
import './LocalExpertInsights.css';

// Sample expert data - in a real app, this would come from your backend
const experts = [
  {
    id: 1,
    name: 'Rahul Sharma',
    title: 'Local Historian',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    expertise: ['historical', 'cultural'],
    bio: 'Rahul has been studying Indore\'s history for over 15 years and has published several books on the city\'s heritage.'
  },
  {
    id: 2,
    name: 'Priya Patel',
    title: 'Food Expert & Blogger',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    expertise: ['food', 'cultural'],
    bio: 'Priya runs a popular food blog featuring Indore\'s street food and has been featured in national food magazines.'
  },
  {
    id: 3,
    name: 'Amit Verma',
    title: 'Nature Guide',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    expertise: ['nature', 'adventure'],
    bio: 'Amit has been leading nature tours around Indore for over a decade and is an expert on local flora and fauna.'
  },
  {
    id: 4,
    name: 'Deepa Joshi',
    title: 'Cultural Expert',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    expertise: ['religious', 'cultural', 'historical'],
    bio: 'Deepa has a PhD in Cultural Studies and specializes in the religious and cultural traditions of Madhya Pradesh.'
  }
];

// Sample insights data - in a real app, this would come from your backend
const sampleInsights = {
  historical: [
    {
      expertId: 1,
      content: "The architecture of this place shows a unique blend of Maratha, Mughal, and European influences. Notice the intricate carvings on the pillars which tell stories of the Holkar dynasty.",
      tip: "Visit early morning to see the beautiful play of light on the stone carvings."
    },
    {
      expertId: 4,
      content: "This site was not just a royal residence but also served as an important administrative center during the Holkar rule. The eastern wing housed the royal treasury.",
      tip: "Look for the hidden symbols of prosperity in the ceiling designs."
    }
  ],
  religious: [
    {
      expertId: 4,
      content: "This temple follows the Nagara style of architecture, common in North India. The sanctum sanctorum is aligned to catch the first rays of the morning sun on equinox days.",
      tip: "Visit during Navratri festival when the temple is decorated with thousands of oil lamps."
    },
    {
      expertId: 1,
      content: "The temple complex was built over a period of 25 years and incorporates elements from various religious traditions, showing the inclusive nature of local spiritual practices.",
      tip: "Notice the water conservation system built into the temple design - an ancient example of sustainable architecture."
    }
  ],
  food: [
    {
      expertId: 2,
      content: "This area is famous for its unique take on chaat that combines Gujarati, Rajasthani, and local Malwa influences. The recipes have been preserved for generations.",
      tip: "Try the 'Garadu' (spicy fried yam) during winter months - it's a local specialty not found elsewhere."
    },
    {
      expertId: 4,
      content: "The food culture here developed during the late 18th century when traders from various regions settled in Indore, bringing their culinary traditions with them.",
      tip: "The best time to experience the food is after 7 PM when all stalls are open and bustling with activity."
    }
  ],
  nature: [
    {
      expertId: 3,
      content: "This natural formation dates back millions of years and features unique rock structures formed during the Deccan Trap volcanic activity. The local ecosystem supports over 120 bird species.",
      tip: "Visit after monsoon (September-October) when the waterfall is at its full glory and the surrounding forest is lush green."
    },
    {
      expertId: 3,
      content: "The area is home to several medicinal plants used in traditional Ayurvedic medicine. Local tribal communities have been conserving this biodiversity for centuries.",
      tip: "Take the less-traveled eastern trail to spot more wildlife and rare plant species."
    }
  ],
  default: [
    {
      expertId: 1,
      content: "Indore has a rich cultural heritage that blends various influences from across central India. This location represents the city's vibrant character.",
      tip: "Explore the surrounding areas to discover hidden gems that most tourists miss."
    },
    {
      expertId: 2,
      content: "The local community takes great pride in maintaining their traditions while embracing modernity, which is evident in this place.",
      tip: "Talk to the locals to learn fascinating stories about this place that you won't find in guidebooks."
    }
  ]
};

const LocalExpertInsights = ({ place }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeExpert, setActiveExpert] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get insights based on place category
        const categoryInsights = sampleInsights[place.category] || sampleInsights.default;
        setInsights(categoryInsights);
        
        // Set the first expert as active by default
        if (categoryInsights.length > 0) {
          setActiveExpert(experts.find(e => e.id === categoryInsights[0].expertId));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setLoading(false);
      }
    };
    
    fetchInsights();
  }, [place.category]);

  if (loading) {
    return (
      <div className="insights-loading">
        <div className="loading-spinner"></div>
        <p>Loading expert insights...</p>
      </div>
    );
  }

  return (
    <div className="local-expert-insights">
      <div className="insights-header">
        <h3>Local Expert Insights</h3>
        <p>Discover authentic information and tips from Indore's local experts</p>
      </div>
      
      {insights.length > 0 ? (
        <div className="insights-content">
          {insights.map((insight, index) => {
            const expert = experts.find(e => e.id === insight.expertId);
            return (
              <div 
                className={`insight-card ${activeExpert?.id === expert.id ? 'active' : ''}`} 
                key={index}
                onClick={() => setActiveExpert(expert)}
              >
                <div className="expert-info">
                  <div className="expert-avatar">
                    <img src={expert.avatar} alt={expert.name} />
                  </div>
                  <div className="expert-details">
                    <h4>{expert.name}</h4>
                    <p className="expert-title">{expert.title}</p>
                  </div>
                </div>
                <div className="insight-content">
                  <p>{insight.content}</p>
                  <div className="expert-tip">
                    <span className="tip-label">Expert Tip:</span>
                    <p>{insight.tip}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-insights">
          <p>No expert insights available for this place yet. Check back soon!</p>
        </div>
      )}
      
      {activeExpert && (
        <div className="active-expert-bio">
          <h4>About {activeExpert.name}</h4>
          <p>{activeExpert.bio}</p>
        </div>
      )}
    </div>
  );
};

export default LocalExpertInsights;
