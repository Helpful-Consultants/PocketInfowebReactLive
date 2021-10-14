import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import { parse } from 'date-fns';
import { getLtpLoanStatus } from '../helpers/ltpLoanStatus';
import { getDateDifference, getDisplayDateFromDDMMYYY } from '../helpers/dates';
import Colors from '../constants/Colors';

const nowDateObj = new Date();

export default function LtpLoansList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  //   const ltpLoans = ltpLoansDummyData;

  const { showFullDetails, items } = props;
  const ltpLoans = items || [];
  //   console.log('ltp list props', props);

  const getFormattedLtpLoan = (item) => {
    let measureIsLive = false;
    if (item && item.dateCreated && item.expiryDate) {
      measureIsLive = getLtpLoanStatus(nowDateObj, item);
    }
    const parsedEndDueDate =
      (item.endDateDue && parse(item.endDateDue, 'dd/MM/yyyy', new Date())) ||
      null;

    const daysLeft = getDateDifference(nowDateObj, parsedEndDueDate) + 1;
    // console.log(item.loanToolNo, 'ddddddaysLeft', daysLeft);

    return (
      <View style={baseStyles.containerNoMargin}>
        <View>
          <Text
            style={baseStyles.textLeftAlignedBoldLarge}
          >{`${item.loanToolNo} - ${item.toolDescription}`}</Text>
        </View>
        <View>
          {item.startDate || item.endDateDue ? (
            <View
              style={{
                ...baseStyles.viewRowFlexCentreAligned,
                marginTop: showFullDetails && showFullDetails === true ? 3 : 0,
              }}
            >
              <Text style={{ ...baseStyles.textLeftAligned, marginTop: 2 }}>
                Your loan period is
                {item.startDate
                  ? ` ${getDisplayDateFromDDMMYYY(item.startDate)}`
                  : null}
                {item.endDateDue
                  ? ` to ${getDisplayDateFromDDMMYYY(item.endDateDue)}`
                  : null}
              </Text>
            </View>
          ) : null}
          <View>
            {daysLeft < 1 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgWarmRed,
                }}
              >
                {`This loan item is late back and may incur a penalty charge`}
              </Text>
            ) : daysLeft === 1 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgWarmRed,
                }}
              >
                {`LAST DAY! Please return this today to avoid a late penalty charge.`}
              </Text>
            ) : daysLeft > 4 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAligned,
                  color: Colors.vwgBlack,
                }}
              >
                {`${daysLeft} ${
                  daysLeft === 1 ? `day` : `days`
                } left of this loan`}
              </Text>
            ) : daysLeft <= 2 ? (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgWarmRed,
                }}
              >
                {`${daysLeft} ${
                  daysLeft === 1 ? `day` : `days`
                } left, please repare your loan for return. The return policy can be viewed on the LTP website.`}
              </Text>
            ) : (
              <Text
                style={{
                  ...baseStyles.textLeftAlignedBold,
                  color: Colors.vwgWarmOrange,
                }}
              >
                {`${daysLeft} ${
                  daysLeft === 1 ? `day` : `days`
                } left of this loan`}
              </Text>
            )}
          </View>
          {item.createdBy ? (
            <Text style={{ ...baseStyles.textLeftAligned, marginTop: 3 }}>
              {item.createdBy.toLowerCase() === 'lyndon evans'
                ? 'Arranged by Tools & Equipment Manager'
                : `Ordered by: ${item.createdBy}`}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };
  //   console.log(ltpLoans && ltpLoans);

  return (
    <View style={baseStyles.viewDataList}>
      {ltpLoans && ltpLoans.length > 0
        ? ltpLoans.map((item, i) => (
            <View
              style={
                i === ltpLoans.length - 1
                  ? baseStyles.viewDataListItemNoBorder
                  : baseStyles.viewDataListItemWithBorder
              }
              key={i}
            >
              {getFormattedLtpLoan(item)}
            </View>
          ))
        : null}
    </View>
  );
}
