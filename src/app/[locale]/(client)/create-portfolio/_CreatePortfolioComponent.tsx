"use client"

import CreatePortfolioForm from "@/components/CreatePortfolioForm/CreatePortfolioForm";
import CreatePortfolioContextProvider from "@/contexts/CreatePortfolioContext";

const CreatePortfolioComponent = () => (
    <CreatePortfolioContextProvider>
        <div className='mt-40 mb-5'>
            <CreatePortfolioForm />
        </div>
    </CreatePortfolioContextProvider>
);

export default CreatePortfolioComponent;