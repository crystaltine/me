import React from "react";
import Menubar from "../components/menubar";
import Footer from "../components/footer";

import '../styles/general/pages.css';

interface GenericPageProps {
  useExpandableClass?: boolean;
  selected?: string;
  children?: React.ReactNode;
  noMenubar?: boolean;
  noMarginTop?: boolean;
  noIncludeFooter?: boolean;
}

export const GenericPage = (props: GenericPageProps) => {

  return (
    <div 
    className={`generic-page-body${props.useExpandableClass? '-expandable' : ''}`}
    style={{ 
      marginTop: props.noMarginTop || props.noMenubar? 0 : undefined,
      minHeight: '100%',
      height: props.noMenubar? '100vh' : undefined,
    }}>

      {!(props.noMenubar) && <Menubar selected={props.selected} />}
      
      <div className="generic-page-fadein">
        {props.children}
      </div>

      {!(props.noIncludeFooter===true) && <Footer />}

    </div>
  );
};

/**
 * 
 * ### Props:
 * {
 *  title: string;
 *  padX?: string; // CSS style string such as min(10px, 5%);
 *  padY?: string; // CSS style string such as min(10px, 5%);
 *  selected?: string;
 *  children?: React.ReactNode;
 *  noMenubar?: boolean;
 *  noMarginTop?: boolean;
 *  noIncludeFooter?: boolean;
 * }
 * 
 * styling of the inner container:
 * 
 * padding: var(--pagePaddingY) var(--pagePaddingX);
 * max-width: 1600px;
 * margin: auto;
 * 
 * ^ This also contains the header
 */
export const GenericPagePadded = (props: GenericPageProps & {title?: string}) => {
  return (
    <GenericPage {...props}>
      <div className='genpage-container'>
        <div className='genpage-header'>{props.title}</div>
        {props.children}
      </div>
    </GenericPage>
  )
}