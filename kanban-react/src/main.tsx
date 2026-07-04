import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';


/*const exampleBoard: Board = {
    id: 1,
    name: 'Example Board',
    columns: [
        {
            id: 1,
            title: 'To Do',
            stories: [
                {
                    id: 1,
                    title: 'Implement login feature',
                    tags: ['authentication', 'frontend'],
                    owner: 'Alice'
                },
                {
                    id: 2,
                    title: 'Implement other feature',
                    tags: ['authentication', 'foo'],
                    owner: 'Bob'
                }
            ]
        },
        {
            id: 2,
            title: 'In Progress',
            stories: []
        },
        {
            id: 3,
            title: 'Done',
            stories: [
                {
                    id: 3,
                    title: 'Do stuff',
                    tags: ['vague'],
                    owner: 'Nobody'
                }
            ]
        }
    ]
};*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
