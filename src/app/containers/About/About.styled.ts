import styled from "app/theme";
import ExtensiblePic from 'app/components/molecules/ExtensiblePic';

export const Container = styled.section`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const PictureHandler = styled(ExtensiblePic)`
  width: 100%;
  margin: 1rem 0;
  cursor: pointer;
`;

export const Picture = styled.img`
  width: 100%;
`;

export const HtmlBlock = styled.article`
  font-size: ${({ theme }) => theme.fontSizes.average};
  color: ${({ theme }) => theme.color};
  font-family: ${({ theme }) => theme.fonts.primary};
  p {
    font-family: ${({ theme }) => theme.fonts.primary};
    a {
      font-family: inherit;
      color: inherit;
      text-decoration: underline;
    }
  }
  

`