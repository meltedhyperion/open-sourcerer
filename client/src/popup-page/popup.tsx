import React, { FC, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import "./popup.css";
import "../styles/globals.css";
import GithubLanguages, { GithubLanguagesProps } from 'react-github-languages'
interface IProps {

}

export const Popup: FC<IProps> = () => {
  const [percentage,setPercentage] = useState(20)
  const [totalContributions,setTotalContributions] = useState(0)
  const [contributionRate, setContributionRate] = useState(0)
  const [publicRepos, setPublicRepos] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [techStack, setTechStack] = useState(['NA'])
  const [showRepoAnalytics, setShowRepoAnalytics] = useState(false) 
  const [isAGithubRepoPage, setIsAGithubRepoPage] = useState(true)
  const [issueTags, setIssueTags]=useState(['N/A'])
  const [prMergeRate, setPrMergeRate]=useState(0)
  const [organizationSize, setOrganizationSize]=useState(0) 
  const [openIssues, setOpenIssues]=useState(0) 
  const [closedIssues,setClosedIssues]=useState(0) 
  const [documentationLength, setDocumentationLength]=useState(0)
  const [repoLink, useRepoLink] = useState("meltedhyperion/open-sourcerer")
    const handleCloseButtonClick = () => {
        window.close();
    };
    useEffect(() => {
      console.log(location.pathname)
    },[])
    return (
      <div className="flex flex-col h-full">
      
      {isAGithubRepoPage && (
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">Open Sourcerer</h1>
          <button className="Button--primary Button " onClick={() => setShowRepoAnalytics(!showRepoAnalytics)}>{showRepoAnalytics?" My Profile Analytics":"Repo Analytics"}</button>
        </div>
      )}
    
      <hr className="my-2 border-gray-400" />
      {
        showRepoAnalytics?<RepoAnalytics
                            percentage={percentage}
                            issueTags={issueTags}
                            prMergeRate={prMergeRate}
                            organizationSize={organizationSize}
                            openIssues={openIssues}
                            closedIssues={closedIssues}
                            documentationLength={documentationLength}
                            repoLink={repoLink} />
                          :<UserAnalytics 
                          totalContributions={totalContributions}
                          contributionRate={contributionRate}
                          publicRepos={publicRepos}
                          currentStreak={currentStreak}
                          techStack={techStack}/>  
        
      }

      <div className="flex flex-row justify-end items-end">
          <button className="btn Button" onClick={handleCloseButtonClick}>Close</button>
      </div>
  </div>
    )
}
interface ProgressBarProps {
    percentage: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const gradientId = 'progress-gradient';
  
    const gradientStops = [
        { offset: '0%', color: '#03fc0b' },
      { offset: '50%', color: '#ed8309' },
      { offset: '100%', color: '#f2340a' },
    ];
  
    const [offset, setOffset] = useState(251.2);
  
    useEffect(() => {
      const newOffset = 251.2 - (251.2 * percentage) / 100;
      setOffset(newOffset);
    }, [percentage]);
  
    return (
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientStops.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e6e6" strokeWidth="12" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251.2"
            transform="rotate(-90, 50, 50)"
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
          <text
            x="50"
            y="53"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
            fontSize="24"
            fill="#f68e56"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    );
  };
  const UserAnalytics = ({totalContributions, contributionRate, publicRepos, currentStreak, techStack}:
    {totalContributions:number,
    contributionRate: number,
    publicRepos: number,
    currentStreak:number,
    techStack:string[]}
  ) => {
    return (
      <div className="flex-grow flex">
            <div className='flex flex-col flex-grow'>
              <div className='flex flex-grow h-[33%]'>
                <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 text-sm'>
                    Total Contributions
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {totalContributions}
                  </div>
                </div>
                <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 text-sm'>
                    Contribution Rate
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {contributionRate}%
                  </div>
                </div>
              </div>
              <div className='flex flex-grow h-[33%]'>
              <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 text-sm'>
                    Total Public Repositories
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {publicRepos}
                  </div>
                </div>
                <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 text-sm'>
                    Current Streak
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {currentStreak} days
                  </div>
                </div>
              </div>
              <div className='flex flex-grow h-[33%]'>
              <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 text-sm'>
                    My Tech Stack 
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    <div className='flex items-center p-3 flex-wrap gap-1 scale-125'>
                      {techStack.map((element)=> <IssueTag issue={element}/>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
        </div>
    )
  };

  const RepoAnalytics = ( {percentage,
                          issueTags,
                          prMergeRate,
                          organizationSize,
                          openIssues,
                          closedIssues,
                          documentationLength,
                          repoLink}:
                          {percentage: number, 
                          issueTags: string[],
                          prMergeRate:number, 
                          organizationSize:number, 
                          openIssues:number, 
                          closedIssues:number, 
                          documentationLength: number, 
                          repoLink:string}
                        ) => {
    return (
          <div className="flex-grow flex">
            <div className='flex flex-col'>
              <div className='p-4'>
                <ProgressBar percentage={percentage} />
              </div>
              
              <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 mt-7 w-[90%]'>
                  <div className='flex items-center justify-center p-1'>
                    Issue tags
                  </div>
                  <div className='flex items-center px-3 flex-wrap gap-1'>
                  {issueTags.map((issue)=> <IssueTag issue={issue}/>)}
                  </div>
                </div>
            </div>
            <div className='flex flex-col flex-grow'>
              <div className='flex flex-grow h-[3.5rem]'>
                <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 '>
                    PR Merge Rate
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {prMergeRate}%
                  </div>
                </div>
                <div className='grow flex flex-col bg-[#20252B] rounded-2xl m-2 my-3'>
                  <div className='flex items-center justify-center p-1 '>
                    Organization Size
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {organizationSize}
                  </div>
                </div>
              </div>
              <div className='flex flex-grow h-[3.5rem]'>
              <div className="flex flex-col bg-[#20252B] rounded-2xl m-2 my-3" style={{ flexBasis: '60%' }}>
                  <div className="flex items-center justify-center p-1 ">
                    Issues
                  </div>
                  <div className="flex flex-row flex-grow p-1">
                    <div className="grow bg-[#54575bc5] rounded-md m-1 flex flex-col">
                      <div className="flex items-center justify-center p-0.5 ">
                        Open
                      </div>
                      <div className='flex items-center justify-center text-3xl font-bold'>
                        {openIssues}
                      </div>
                    </div>
                    <div className="grow bg-[#54575bc5] rounded-md m-1">
                      <div className="flex items-center justify-center p-0.5 ">
                        Close
                      </div>
                      <div className='flex items-center justify-center text-3xl font-bold'>
                        {closedIssues}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col flex-grow bg-[#20252B] rounded-2xl m-2 my-3' style={{ flexBasis: '40%' }}>
                  <div className='flex items-center justify-center p-1'>
                    Documentation Length
                  </div>
                  <div className='flex items-center justify-center text-5xl font-bold p-1'>
                    {documentationLength}
                  </div>
                </div>
              </div>
              <div className="flex flex-grow bg-[#20252B] rounded-2xl m-2 justify-center items-center h-8 p-3">
                  <GithubLanguages repository={repoLink} width={340} textColor='white' lightColor='#aaa'/>
              </div>
              </div>
            </div>
            
    )
  }

  const IssueTag = ({ issue } : { issue: string }) => {
    return (
      <div className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
        <svg className='mr-1.5 h-2 w-2 text-blue-400' fill='currentColor' viewBox='0 0 8 8'>
          <circle cx='4' cy='4' r='3' />
        </svg>
        {issue}
      </div>
    );
  };
  render(<Popup />, document.getElementById('popup'));

