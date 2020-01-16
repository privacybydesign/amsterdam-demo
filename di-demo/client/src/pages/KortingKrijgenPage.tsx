import React from 'react'
import { useParams } from 'react-router-dom';

const KortingKrijgenPage: React.FC<{}> = () => {
    const { theme } = useParams();
    return <h1>KortingKrijgenPage</h1>
} 

export default KortingKrijgenPage;