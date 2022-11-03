import { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Box } from 'Box';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    const option = event.currentTarget.textContent;

    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const totalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / totalFeedback) * 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        width={500}
        mt={5}
        mr={9}
        ml={9}
        pt={4}
        pb={4}
        pl={4}
        boxShadow="boxShadow"
      >
        <Section title={<h1>Please leave feedback</h1>}>
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={onLeaveFeedback}
          ></FeedbackOptions>
        </Section>

        <Section title={<h2>Statistics</h2>}>
          {totalFeedback > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback." />
          )}
        </Section>
      </Box>
    </ThemeProvider>
  );
};
