import stapler from '../../img/stapler.png'
import { H1Error, H2 } from '../Styled/Headings';
import { ErrorImg } from '../Styled/Img';
import { LinkNotFound } from '../Styled/Link';
import { NotFoundSection } from '../Styled/Section';

export function NoPage(){
    return(<>
    <NotFoundSection>
        <H1Error>4<ErrorImg src={stapler} alt=""/>4</H1Error>
        <H2>Nu har ni kommit lite fel, försök gärna igen eller klicka <LinkNotFound to="/">här!</LinkNotFound></H2>
    </NotFoundSection></>)
}