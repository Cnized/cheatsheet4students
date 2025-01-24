'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
// Mock user authentication state
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser({ email, favorites: [] });
  };

  const signup = (email, password) => {
    setIsAuthenticated(true);
    setUser({ email, favorites: [] });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  return { isAuthenticated, user, login, signup, logout };
};



// Formula data structure
const formulas = {
  mathematics: [
    {
      id: 'math1',
      title: 'Quadratic Formula',
      formula: 'x = (-b ± √(b² - 4ac)) / 2a',
      description: 'Solves quadratic equations in the form ax² + bx + c = 0'
    },
    {
      id: 'math2',
      title: 'Pythagorean Theorem',
      formula: 'a² + b² = c²',
      description: 'Relates the lengths of the sides in a right triangle'
    },
    {
      id: 'math3',
      title: 'Exponential Growth',
      formula: 'A = P(1 + r)ᵗ',
      description: 'Models growth where rate of change is proportional to current value'
    },
    {
      id: 'math4',
      title: 'Logarithmic Formula',
      formula: 'logₐ(x) = y ⟺ aʸ = x',
      description: 'Expresses logarithmic relationships and their exponential equivalents'
    },
    {
      id: 'math5',
      title: 'Distance Formula',
      formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²]',
      description: 'Distance between two points in a 2D plane'
    },
    {
      id: 'math6',
      title: 'Slope Formula',
      formula: 'm = (y₂-y₁)/(x₂-x₁)',
      description: 'Rate of change between two points'
    },
    {
      id: 'math7',
      title: 'Compound Interest',
      formula: 'A = P(1 + r/n)^(nt)',
      description: 'Growth of investment with interest compounded n times per year'
    },
    {
      id: 'math8',
      title: 'Binomial Theorem',
      formula: '(x + y)ⁿ = Σᵏ₌₀ⁿ (ⁿCₖ) xⁿ⁻ᵏyᵏ',
      description: 'Expansion of binomial expressions with integer exponents'
    },
    {
      id: 'math9',
      title: 'Arithmetic Sequence',
      formula: 'aₙ = a₁ + (n - 1)d',
      description: 'Finding the nth term in an arithmetic progression'
    },
    {
      id: 'math10',
      title: 'Combinations Formula',
      formula: 'ⁿCᵣ = n! / (r! * (n-r)!)',
      description: 'Number of ways to choose r items from n items'
    },

  ],
  physics: [
    {
      id: 'phys1',
      title: 'Newton\'s Second Law',
      formula: 'F = ma',
      description: 'Force equals mass times acceleration'
    },
    {
      id: 'phys2',
      title: 'Kinetic Energy',
      formula: 'KE = ½mv²',
      description: 'Energy of motion'
    },
    {
      id: 'phys3',
      title: 'Universal Gravitation',
      formula: 'F = G(m₁m₂)/r²',
      description: 'Gravitational force between two masses'
    },
    {
      id: 'phys4',
      title: 'Special Relativity',
      formula: 'E = mc²',
      description: 'Relationship between mass and energy'
    },
    {
      id: 'phys5',
      title: 'Wave Equation',
      formula: 'v = fλ',
      description: 'Relationship between wave velocity, frequency, and wavelength'
    },
    {
      id: 'phys6',
      title: 'Ohm\'s Law',
      formula: 'V = IR',
      description: 'Relationship between voltage, current, and resistance'
    },
    {
      id: 'phys7',
      title: 'Power',
      formula: 'P = VI',
      description: 'Electrical power in terms of voltage and current'
    },
    {
      id: 'phys8',
      title: 'Centripetal Force',
      formula: 'F = mv²/r',
      description: 'Force causing circular motion'
    },
    {
      id: 'phys9',
      title: 'Doppler Effect',
      formula: 'f\' = f(v ± vr) / (v ± vs)',
      description: 'Frequency change of a wave for a moving source or observer'
    },
    {
      id: 'phys10',
      title: 'Momentum Conservation',
      formula: 'm₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'',
      description: 'Total momentum remains constant in a closed system'
    },

    
  ],
  geometry: [
    {
      id: 'geom1',
      title: 'Circle Area',
      formula: 'A = πr²',
      description: 'Area of a circle with radius r'
    },
    {
      id: 'geom2',
      title: 'Sphere Volume',
      formula: 'V = (4/3)πr³',
      description: 'Volume of a sphere with radius r'
    },
    {
      id: 'geom3',
      title: 'Surface Area of Cylinder',
      formula: 'A = 2πr² + 2πrh',
      description: 'Total surface area of a cylinder with radius r and height h'
    },
    {
      id: 'geom4',
      title: 'Triangle Area',
      formula: 'A = ½bh',
      description: 'Area of a triangle with base b and height h'
    },
    {
      id: 'geom5',
      title: 'Cylinder Volume',
      formula: 'V = πr²h',
      description: 'Volume of a cylinder with radius r and height h'
    },
    {
      id: 'geom6',
      title: 'Cone Volume',
      formula: 'V = (1/3)πr²h',
      description: 'Volume of a cone with radius r and height h'
    },
    {
      id: 'geom7',
      title: 'Regular Polygon Area',
      formula: 'A = (n × s × h)/2',
      description: 'Area of a regular polygon with n sides, side length s, and apothem h'
    },
    {
      id: 'geom8',
      title: 'Ellipse Area',
      formula: 'A = πab',
      description: 'Area of an ellipse with semi-major axis a and semi-minor axis b'
    },
    {
      id: 'geom9',
      title: 'Pyramid Volume',
      formula: 'V = (1/3) × B × h',
      description: 'Volume of a pyramid with base area B and height h'
    },
    {
      id: 'geom10',
      title: 'Torus Volume',
      formula: 'V = 2π²Rr²',
      description: 'Volume of a torus with major radius R and minor radius r'
    }

  ],
  chemistry: [
    {
      id: 'chem1',
      title: 'Ideal Gas Law',
      formula: 'PV = nRT',
      description: 'Relationship between pressure, volume, and temperature of a gas'
    },
    {
      id: 'chem2',
      title: 'Density',
      formula: 'ρ = m/V',
      description: 'Mass per unit volume'
    },
    {
      id: 'chem3',
      title: 'pH Scale',
      formula: 'pH = -log[H⁺]',
      description: 'Measure of hydrogen ion concentration in a solution'
    },
    {
      id: 'chem4',
      title: 'Molarity',
      formula: 'M = moles/volume',
      description: 'Concentration of a solution in moles per liter'
    },
    {
      id: 'chem5',
      title: 'Gibbs Free Energy',
      formula: 'ΔG = ΔH - TΔS',
      description: 'Change in Gibbs free energy for a reaction'
    },
    {
      id: 'chem6',
      title: 'Henderson-Hasselbalch',
      formula: 'pH = pKa + log([A⁻]/[HA])',
      description: 'pH of a buffer solution'
    },
    {
      id: 'chem7',
      title: 'Van der Waals Equation',
      formula: '(P + an²/V²)(V - nb) = nRT',
      description: 'Real gas behavior accounting for molecular interactions'
    },
    {
      id: 'chem8',
      title: 'Arrhenius Equation',
      formula: 'k = Ae^(-Ea/RT)',
      description: 'Rate constant dependence on temperature'
    },
    {
      id: 'chem9',
      title: 'Nernst Equation',
      formula: 'E = E° - (RT/nF)ln(Q)',
      description: 'Relationship between cell potential and reaction quotient'
    },
    {
      id: 'chem10',
      title: 'Law of Mass Action',
      formula: 'K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ',
      description: 'Equilibrium constant for chemical reactions'
    },

  ]
};

const aiResources = [
  {
    title: 'Mathematics AI Tools',
    tools: [
      {
        name: 'Wolfram Alpha',
        description: 'Computational knowledge engine for mathematics',
        url: 'https://www.wolframalpha.com'
      },
      {
        name: 'Photomath',
        description: 'Camera calculator and math solver',
        url: 'https://photomath.com'
      }
    ]
  },
  {
    title: 'AI Web Development Tools',
    tools: [
      {
        name: 'GitHub Copilot',
        description: 'AI-powered code completion and suggestion tool',
        url: 'https://github.com/features/copilot'
      },
      {
        name: 'ChatGPT',
        description: 'Advanced language model for code assistance and problem-solving',
        url: 'https://chat.openai.com'
      }
    ]
  },
  {
    title: 'Physics AI Tools',
    tools: [
      {
        name: 'PhET Interactive Simulations',
        description: 'AI-enhanced physics simulations and experiments',
        url: 'https://phet.colorado.edu'
      },
      {
        name: 'Brilliant.org',
        description: 'Interactive physics courses with AI-guided learning',
        url: 'https://brilliant.org'
      }
    ]
  },
  {
    title: 'Chemistry AI Tools',
    tools: [
      {
        name: 'ChemAI',
        description: 'AI-powered molecular structure prediction',
        url: 'https://chemai.com'
      },
      {
        name: 'MolView',
        description: '3D molecular modeling and visualization',
        url: 'https://molview.org'
      }
    ]
  },
  {
    title: 'Geometry AI Tools',
    tools: [
      {
        name: 'GeoGebra',
        description: 'Interactive geometry software with AI features',
        url: 'https://www.geogebra.org'
      },
      {
        name: 'Euclidea',
        description: 'Geometric construction puzzles with AI assistance',
        url: 'https://www.euclidea.xyz'
      }
    ]
  },
  {
    title: 'General Learning AI Tools',
    tools: [
      {
        name: 'Khan Academy',
        description: 'AI-powered personalized learning platform',
        url: 'https://www.khanacademy.org'
      },
      {
        name: 'Quizlet',
        description: 'AI-enhanced flashcards and study tools',
        url: 'https://quizlet.com'
      }
    ]
  },
  {
    title: 'Biology AI Tools',
    tools: [
      {
        name: 'AlphaFold',
        description: 'AI-powered protein structure prediction',
        url: 'https://alphafold.ebi.ac.uk/'
      },
      {
        name: 'iNaturalist',
        description: 'AI species identification and ecological research',
        url: 'https://www.inaturalist.org'
      }
    ]
  },
  {
    title: 'Machine Learning AI Tools',
    tools: [
      {
        name: 'Kaggle',
        description: 'Machine learning competitions and datasets',
        url: 'https://www.kaggle.com'
      },
      {
        name: 'Google Colab',
        description: 'Cloud-based Jupyter notebook environment for ML',
        url: 'https://colab.research.google.com'
      }
    ]
  },
  {
    title: 'Language Learning AI Tools',
    tools: [
      {
        name: 'Duolingo',
        description: 'AI-powered language learning platform',
        url: 'https://www.duolingo.com'
      },
      {
        name: 'Grammarly',
        description: 'AI writing and grammar assistance',
        url: 'https://www.grammarly.com'
      }
    ]
  }
];

const FormulaHub = () => {
  const [activeTab, setActiveTab] = useState('mathematics');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleTabChange = (tab) => {
    setLoading(true);
    setSearchTerm(''); // Clear search when changing tabs
    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);
    }, 500);
  };

  const handleFavorite = (formulaId) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setFavorites(prev => {
      if (prev.includes(formulaId)) {
        return prev.filter(id => id !== formulaId);
      }
      return [...prev, formulaId];
    });
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFilteredContent = () => {
    if (activeTab === 'ai') {
      return aiResources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tools.some(tool =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (activeTab !== 'chat') {
      return formulas[activeTab].filter(formula =>
        formula.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formula.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formula.formula.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Cheat Sheet 4 Students !</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 rounded-md"
                    >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="border-b border-gray-200 overflow-x-auto"> 
      <nav className="flex -mb-px space-x-4 sm:space-x-8 min-w-max">
            {Object.keys(formulas).concat(['ai', 'chat']).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`
                  py-2 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
  {activeTab !== 'chat' && (
<div className="mb-4 sm:mb-6">
  <input
    type="text"
    placeholder={`Search ${activeTab}...`}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-2 sm:p-3 text-sm border rounded"
  />
  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mt-3">
    <p className="text-blue-600 text-center text-sm">
      Need help with {activeTab}? 
      <button 
        onClick={() => handleTabChange('chat')} 
        className="ml-1 sm:ml-2 text-indigo-600 font-medium hover:underline"
      >
        Ask our AI assistant
      </button>
    </p>
  </div>
</div>
  )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : activeTab === 'ai' ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getFilteredContent().map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  
                  <div className="space-y-4">
                    {resource.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="space-y-2">
                        <h4 className="font-medium">{tool.name}</h4>
                        <p className="text-sm text-gray-500">{tool.description}</p>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500 text-sm"
                        >
                          Visit Website →
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
              ) : activeTab === 'chat' ? (
                <ChatBox />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getFilteredContent().map((formula) => (
              <Card key={formula.id}>
                <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">{formula.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-sm sm:text-lg font-mono break-words">{formula.formula}</p>
                  <button
                    onClick={() => copyToClipboard(formula.formula, formula.id)}
                    className="mt-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    {copiedId === formula.id ? 'Copied!' : 'Copy Formula'}
                  </button>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                  {formula.description}
                </p>
              </CardContent>
                <CardFooter>
                  <button
                    onClick={() => handleFavorite(formula.id)}
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium
                      ${favorites.includes(formula.id)
                        ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {favorites.includes(formula.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4">
          <p className="text-center font-semibold text-xs sm:text-sm text-gray-600">
            Kian Kheiri N. <span className="font-bold">(Cnized)</span> © 2023-2025
          </p>
        </div>
      </footer>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <Alert>
              <AlertTitle>Coming Soon!</AlertTitle>
              <AlertDescription>
                User authentication features are coming soon. Stay tuned!
              </AlertDescription>
            </Alert>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaHub;