import React from 'react';
import '../styles/general/popup.css'

interface IPopupProps {
  open: boolean; // default true, func returns null if false
  children: React.ReactNode; // default null
	extraClassString: string; // extra classes for popup body, default ''
  outerStyle: React.CSSProperties; // extra styles for popup body, default {}
  onClose: () => void; // func to run on close, default does nothing
  clickBackdropToClose: boolean; // whether or not clicking outside the popup closes it, default true
  noIncludeBody: boolean; // true: dont nest children in a pre-styled 'body' div (providing padding, border, etc.), default false
}

/**
 * Simple popup component;
 * use a useState to keep track of whether or not to render the popup
 * 
 * Props, all optional:
 * ```typescript
 * interface IPopupProps {
 *  open: boolean; // default true, func returns null if false
 *  children: React.ReactNode; // default null
 *  extraClassString: string; // extra classes for popup body, default ''
 *  outerStyle: React.CSSProperties; // extra styles for popup body, default {}
 *  onClose: () => void; // func to run on close, default does nothing
 *  clickBackdropToClose: boolean; // whether or not clicking outside the popup closes it, default true
 *  noIncludeBody: boolean; // true: dont nest children in a pre-styled 'body' div (providing padding, border, etc.), default false
 *}
 * ```
 */
export const Popup = (props: Partial<IPopupProps>) => {

  if (props.open === false) return null; // if not provided, default to rendering popup

  return (
    <div className='popup-backdrop'>
      <div className='popup-container' onMouseDown={() => props.clickBackdropToClose!==false && props.onClose?.()}>
        <div 
        onMouseDown={(e) => e.stopPropagation()}
        className={`${props.extraClassString || ''} ${props.noIncludeBody? '' : 'popup-body'}`}
        style={props.outerStyle}>

          {props.children}

          <div className='w-full'>
            <button 
            className='button-primary button-medium popup-close-btn' 
            onClick={(e) => { 
              e.stopPropagation();
              props.onClose?.();
            }}>Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};