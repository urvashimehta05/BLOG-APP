const data = [
  {
    title: 'Getting Started with React',
    content: `React is a powerful JavaScript library for building user interfaces.
It lets you create reusable UI components.
React uses a virtual DOM to boost performance.
You write UI using JSX, a syntax extension.
State and props are the main building blocks.
React components can be class-based or functional.
Hooks allow functional components to manage state.
The component lifecycle is handled internally.
React promotes a declarative coding style.
Getting started is easy with Create React App.`,
    author: 'John Doe',
    date: '2024-06-01T10:30:00Z',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'Understanding useEffect in Depth',
    content: `The useEffect hook handles side effects in React.
It runs after the component renders.
You can think of it as a combo of componentDidMount and componentDidUpdate.
It accepts a function that contains effect logic.
A second argument can be an array of dependencies.
This controls when the effect runs again.
Cleaning up effects is also supported.
You can return a function from useEffect.
This cleanup function runs before the next effect.
useEffect is crucial for API calls, subscriptions, and timers.`,
    author: 'Jane Smith',
    date: '2024-06-03T14:00:00Z',
    image: 'https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'Node.js vs Express.js',
    content: `Node.js is a runtime for JavaScript on the server.
It allows full-stack development with JavaScript.
Node comes with built-in modules like fs and http.
Express.js is a minimal web framework for Node.
It simplifies server and routing logic.
You can define routes using app.get, app.post, etc.
Middleware functions help process requests and responses.
Express integrates well with databases like MongoDB.
You can serve static files or build APIs.
Choose Express for speed and flexibility in backend apps.`,
    author: 'Alex Johnson',
    date: '2024-06-05T09:45:00Z',
    image: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: '10 JavaScript Tips You Should Know',
    content: `Use let and const instead of var for block scope.
Use template literals for easier string interpolation.
Learn arrow functions for concise syntax.
Understand how promises and async/await work.
Use the spread and rest operators effectively.
Destructuring makes your code cleaner and shorter.
Optional chaining helps prevent runtime errors.
Master higher-order array methods like map and filter.
Know the difference between == and ===.
Write readable, modular, and DRY code.`,
    author: 'Emily Rose',
    date: '2024-06-06T17:20:00Z',
    image: 'https://media.istockphoto.com/id/2172166279/photo/a-seminar-and-workshop-on-coding-to-enhance-system-efficiency.webp'
  },
  {
    title: 'How to Use MongoDB with Mongoose',
    content: `MongoDB is a NoSQL document database.
It stores data as JSON-like documents.
Mongoose is an ODM for Node.js.
It provides a schema-based solution to model data.
You define a schema using the Schema constructor.
Then you compile it into a model.
Mongoose handles validation and data types.
You can use methods like find, save, update.
It also supports middleware for lifecycle hooks.
Mongoose simplifies database interaction in Node apps.`,
    author: 'Daniel Kim',
    date: '2024-06-07T12:10:00Z',
    image: 'https://images.unsplash.com/photo-1610360655260-decd32e267aa?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'React Router Explained',
    content: `React Router is a routing library for SPAs.
It allows navigation without page reloads.
Use BrowserRouter to wrap your app.
Define routes using Route and Routes components.
Use Link for navigation instead of anchor tags.
Dynamic routes handle URL parameters.
You can use useParams to access route parameters.
Nested routes support component hierarchies.
Redirects can be managed with Navigate.
React Router enhances user experience with seamless navigation.`,
    author: 'Laura James',
    date: '2024-06-08T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1542395765-761de4ee9696?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'Deploying Your Full Stack App',
    content: `Start by choosing a deployment platform like Vercel or Render.
Host your frontend separately from the backend.
Use environment variables for secrets and config.
Make sure your API has CORS enabled.
Connect your backend to MongoDB Atlas or another DB.
Use Git for version control and CI/CD.
Optimize your frontend build before uploading.
Deploy backend APIs as serverless functions or full servers.
Monitor logs and set up error handling.
Test your deployment thoroughly on production URLs.`,
    author: 'Nathan Lee',
    date: '2024-06-10T15:00:00Z',
    image: 'https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?q=80&w=1171&auto=format&fit=crop'
  },
  {
    title: 'Styled Components vs Tailwind CSS',
    content: `Styled Components use tagged template literals in JS.
Tailwind uses utility-first CSS classes.
Styled Components promote scoped styling.
Tailwind allows rapid UI prototyping.
Choose Styled Components for design systems.
Use Tailwind for atomic design flexibility.
Both integrate well with React.
Tailwind may result in longer class lists.
Styled Components reduce CSS duplication.
Pick based on team preference and project needs.`,
    author: 'Priya Kapoor',
    date: '2024-06-11T09:15:00Z',
    image: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=600&auto=format&fit=crop'
  },
  {
    title: 'What is the Virtual DOM?',
    content: `The virtual DOM is a programming concept.
It’s an in-memory representation of the real DOM.
React updates the virtual DOM on state change.
Then it calculates a diff between old and new.
Only the necessary parts of the real DOM are updated.
This process is called reconciliation.
It improves performance by reducing real DOM manipulations.
Virtual DOM enables fast and dynamic UI updates.
Frameworks like Vue and React use it.
Understanding it helps in writing efficient components.`,
    author: 'Mohammed Irfan',
    date: '2024-06-12T18:45:00Z',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SkFWQVNDUklQVCUyMERPTXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    title: 'Handling Forms in React',
    content: `Forms are crucial for collecting user input.
React forms use controlled components.
Use useState to manage form values.
Bind input values to state variables.
Update state on input change events.
Handle form submission with onSubmit.
Validate inputs before processing.
You can use libraries like Formik or React Hook Form.
Reset forms using initial state.
Make your forms user-friendly and accessible.`,
    author: 'Grace Liu',
    date: '2024-06-13T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1681583484651-281ae2defb17?w=600&auto=format&fit=crop'
  }
];

module.exports = data;
