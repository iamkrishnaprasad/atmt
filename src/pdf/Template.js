/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import { Document, Page, View, Image, Text, Font, StyleSheet } from '@react-pdf/renderer';
import Moment from 'moment';
import LOGO from '../assets/logo.png';
import locale from '../locale/pdfTemplate.json';

import CairoRegular from '../assets/fonts/Cairo/Cairo-Regular.ttf';
import CairoBold from '../assets/fonts/Cairo/Cairo-Bold.ttf';

import toFormattedNumber from '../utils/general';

Font.register({
  family: 'Cairo',
  fonts: [{ src: CairoRegular }, { src: CairoBold, fontWeight: 'bold' }],
});

const styles = StyleSheet.create({
  page: { flexDirection: 'column', height: '100%', padding: '40px', fontSize: '8px', fontFamily: 'Cairo' },
  textAlignCenter: { textAlign: 'center' },
  textAlignJustify: { textAlign: 'justify' },
  textAlignLeft: { textAlign: 'left' },
  textAlignRight: { textAlign: 'right' },
  justifyContentCenter: { justifyContent: 'center' },
  headerView: { width: '515px', flexDirection: 'row-reverse', paddingBottom: '8px' },
  logoImage: { height: '130px', width: '130px', marginLeft: '40px', marginBottom: '20px' },
  companyDetailsView: { width: '345px', height: '150px', justifyContent: 'center', paddingLeft: '0px' },
  companyDetailsNameText: { fontSize: '12px', textAlign: 'left', marginBottom: '4px', fontWeight: 'bold' },
  companyDetailsAddressView: { paddingLeft: '0px' },
  companyDetailsText: { textAlign: 'left' },
  titleText: { height: '35px', fontSize: '16px', textAlign: 'center', fontWeight: 600 },
  detailsContainer: { width: '369px' },
  detailsView: { paddingLeft: '10px', marginBottom: '4px' },
  detailsText: { marginBottom: '4px' },
  detailsHeadText: { marginBottom: '4px', fontWeight: 'bold' },
  qrCodeView: { width: '146px', justifyContent: 'flex-start' },
  tableView: { minHeight: '32px', flexDirection: 'row' },
  tableCellBox: { justifyContent: 'center', borderTop: '1px solid black' },
  tableText: { textAlign: 'center', fontSize: '7px', paddingHorizontal: '2px' },
  tableFooterBox: { justifyContent: 'center', borderTop: '1px solid black', borderBottom: '1px solid black' },
  footerView: { height: '24px', position: 'absolute', width: '100%', bottom: '16px', left: 40, flexDirection: 'row' },
  footerText: { color: 'grey' },
});

const getTitle = (orderType) => {
  switch (orderType) {
    case 'Tax Invoice':
      return `${locale?.en?.invoice?.toUpperCase()} ${locale?.ar?.invoice?.length ? `/ ${locale?.ar?.invoice}` : ''}`;
    case 'simplifiedinvoice':
      return `${locale?.en?.simplifiedinvoice?.toUpperCase()} ${
        locale?.ar?.simplifiedinvoice?.length ? `/ ${locale?.ar?.simplifiedinvoice}` : ''
      }`;
    case 'deliverynote':
      return `${locale?.en?.deliverynote?.toUpperCase()} ${locale?.ar?.deliverynote?.length ? `/ ${locale?.ar?.deliverynote}` : ''}`;
    case 'quotation':
      return `${locale?.en?.quotation?.toUpperCase()} ${locale?.ar?.quotation?.length ? `/ ${locale?.ar?.quotation}` : ''}`;
    default:
      return orderType;
  }
};

function Logo({ src }) {
  return <Image src={src} style={styles.logoImage} />;
}

function CompanyDetails({ data }) {
  return (
    <View style={styles.companyDetailsView}>
      {data?.name ? <Text style={styles.companyDetailsNameText}>{data?.name.trim()?.toUpperCase()}</Text> : null}
      {data?.altName ? <Text style={styles.companyDetailsNameText}>{data?.altName}</Text> : null}
      <View style={styles.companyDetailsAddressView}>
        <View>
          {data?.buildingno?.trim()?.length || data?.streetno?.trim()?.length || data?.district?.trim()?.length ? (
            <Text>
              {data?.buildingno?.trim()?.length ? <>{`${data?.buildingno?.trim()?.toUpperCase()}, `}</> : null}
              {data?.streetno?.trim()?.length ? <>{`${data?.streetno?.trim()?.toUpperCase()}, `}</> : null}
              {data?.district?.trim()?.length ? <>{`${data?.district?.trim()?.toUpperCase()}, `}</> : null}
            </Text>
          ) : null}
          {data?.pobox?.trim()?.length || data?.city?.trim()?.length || data?.citycode?.trim()?.length ? (
            <Text>
              {data?.pobox?.trim()?.length ? <>{`POST BOX: ${data?.pobox?.trim()?.toUpperCase()}, `}</> : null}
              {data?.city?.trim()?.length ? <>{`${data?.city?.trim()?.toUpperCase()}, `}</> : null}
              {data?.citycode?.trim()?.length ? <>{`${data?.citycode?.trim()?.toUpperCase()}, `}</> : null}
            </Text>
          ) : null}
          {data?.country?.trim()?.length ? <Text>{`${data?.country?.trim()?.toUpperCase()}`}</Text> : null}
        </View>
        {data?.vatno?.length ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.vatno} ${locale?.ar?.vatno?.length ? `/ ${locale?.ar?.vatno}` : ''}`}
            {` : `}
            {data?.vatno}
          </Text>
        ) : null}
        {data?.crno ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.crno} ${locale?.ar?.crno?.length ? `/ ${locale?.ar?.crno}` : ''}`}
            {` : `}
            {data?.crno}
          </Text>
        ) : null}
        {data?.phone?.length ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.phone} ${locale?.ar?.phone?.length ? `/ ${locale?.ar?.phone}` : ''}`}
            {` : +966 `}
            {data?.phone}
          </Text>
        ) : null}
        {data?.landline?.length ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.landline} ${locale?.ar?.landline?.length ? `/ ${locale?.ar?.landline}` : ''}`}
            {` : +966 `}
            {data?.landline}
          </Text>
        ) : null}
        {data?.email?.length ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.email} ${locale?.ar?.email?.length ? `/ ${locale?.ar?.email}` : ''}`}
            {` : `}
            {data?.email}
          </Text>
        ) : null}
        {data?.website?.length ? (
          <Text style={styles.companyDetailsText}>
            {`${locale?.en?.website} ${locale?.ar?.website?.length ? `/ ${locale?.ar?.website}` : ''}`}
            {` : `}
            {data?.website}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function Header({ data = '' }) {
  return (
    <View style={styles.headerView}>
      <Logo src={LOGO} />
      <CompanyDetails data={data} />
    </View>
  );
}

function Title({ orderType }) {
  return <Text style={styles.titleText}>{getTitle(orderType)}</Text>;
}

function OrderDetails({ data = '' }) {
  return (
    <>
      <Text style={styles.detailsHeadText}>
        {`${locale?.en?.orderdetails} ${locale?.ar?.orderdetails?.length ? `/ ${locale?.ar?.orderdetails}` : ''}`}
        {` :`}
      </Text>
      <View style={styles.detailsView}>
        {data?.id?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.orderno} ${locale?.ar?.orderno?.length ? `/ ${locale?.ar?.orderno}` : ''}`}
            {`${locale?.ar?.orderno?.length ? ' : ' : ': '}`}
            {`${data?.id?.trim()?.replace('ORD', '').toUpperCase()}`}
          </Text>
        ) : null}
        {data?.orderNo?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.invoiceno} ${locale?.ar?.invoiceno?.length ? `/ ${locale?.ar?.invoiceno}` : ''}`}
            {`${locale?.ar?.invoiceno?.length ? ' : ' : ': '}`}
            {`${data?.orderNo?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
        {data?.paymentTerm?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.paymentterm} ${locale?.ar?.paymentterm?.length ? `/ ${locale?.ar?.paymentterm}` : ''}`}
            {`${locale?.ar?.paymentterm?.length ? ' : ' : ': '}`}
            {`${data?.paymentTerm?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
        {data?.issuedDate?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.issueddate} ${locale?.ar?.issueddate?.length ? `/ ${locale?.ar?.issueddate}` : ''}`}
            {`${locale?.ar?.issueddate?.length ? ' : ' : ': '}`}
            {`${Moment(data?.issuedDate?.trim()?.toUpperCase()).format('YYYY-MM-DD')}`}
          </Text>
        ) : null}
        {data?.validTill?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.validtill} ${locale?.ar?.validtill?.length ? `/ ${locale?.ar?.validtill}` : ''}`}
            {`${locale?.ar?.validtill?.length ? ' : ' : ': '}`}
            {`${Moment(data?.validTill?.trim()?.toUpperCase()).format('YYYY-MM-DD')}`}
          </Text>
        ) : null}
        {data?.refNo?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.refno} ${locale?.ar?.refno?.length ? `/ ${locale?.ar?.refno}` : ''}`}
            {`${locale?.ar?.refno?.length ? ' : ' : ': '}`}
            {`${data?.refNo?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
      </View>
    </>
  );
}

function ClientDetails({ data = '' }) {
  return (
    <>
      <Text style={styles.detailsHeadText}>
        {`${locale?.en?.billto} ${locale?.ar?.billto?.length ? `/ ${locale?.ar?.billto}` : ''}`} {` :  `}
      </Text>

      <View style={styles.detailsView}>
        {data?.name?.trim()?.length ? <Text style={styles.detailsText}>{data?.name?.trim()?.toUpperCase()}</Text> : null}
        {data?.altName?.trim()?.length ? <Text style={styles.detailsText}>{data?.altName?.trim()?.toUpperCase()}</Text> : null}
        {data?.buildingno?.trim()?.length || data?.streetno?.trim()?.length || data?.district?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {data?.buildingno?.trim()?.length ? <>{`${data?.buildingno?.trim()?.toUpperCase()}, `}</> : null}
            {data?.streetno?.trim()?.length ? <>{`${data?.streetno?.trim()?.toUpperCase()}, `}</> : null}
            {data?.district?.trim()?.length ? <>{`${data?.district?.trim()?.toUpperCase()}, `}</> : null}
          </Text>
        ) : null}

        {data?.pobox?.trim()?.length || data?.city?.trim()?.length || data?.citycode?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {data?.pobox?.trim()?.length ? <>{`POST BOX: ${data?.pobox?.trim()?.toUpperCase()}, `}</> : null}
            {data?.city?.trim()?.length ? <>{`${data?.city?.trim()?.toUpperCase()}, `}</> : null}
            {data?.citycode?.trim()?.length ? <>{`${data?.citycode?.trim()?.toUpperCase()}, `}</> : null}
          </Text>
        ) : null}
        {data?.country?.trim()?.length ? <Text style={styles.detailsText}>{`${data?.country?.trim()?.toUpperCase()}, `}</Text> : null}

        {data?.vatno?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.vatno} ${locale?.ar?.vatno?.length ? `/ ${locale?.ar?.vatno}` : ''}`} {` :  `}
            {`${data?.vatno?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
        {data?.crno?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.crno} ${locale?.ar?.crno?.length ? `/ ${locale?.ar?.crno}` : ''}`} {` :  `}
            {`${data?.crno?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
        {data?.contact?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.contactno} ${locale?.ar?.contactno?.length ? `/ ${locale?.ar?.contactno}` : ''}`}
            {` :  +966 `}
            {`${data?.contact?.trim()?.toUpperCase()}`}
          </Text>
        ) : null}
        {data?.email?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.email} ${locale?.ar?.email?.length ? `/ ${locale?.ar?.email}` : ''}`} {` :  `}
            {`${data?.email?.trim()?.toLowerCase()}`}
          </Text>
        ) : null}
        {data?.website?.trim()?.length ? (
          <Text style={styles.detailsText}>
            {`${locale?.en?.website} ${locale?.ar?.website?.length ? `/ ${locale?.ar?.website}` : ''}`} {` :  `}
            {`${data?.website?.trim()?.toLowerCase()}`}
          </Text>
        ) : null}
      </View>
    </>
  );
}

function Details({ data = '' }) {
  return (
    <View style={styles.detailsContainer}>
      {'id' in data || 'orderTypeNo' in data || 'issuedDate' in data || 'validTill' in data || 'refNo' in data ? (
        <OrderDetails data={data} />
      ) : null}
      {'client' in data ? <ClientDetails data={data?.client} /> : null}
    </View>
  );
}

function QRCode({ data = '' }) {
  return <View style={styles.qrCodeView}>{data?.length ? <Image src={data} /> : null}</View>;
}

function TableHead() {
  function TableHeadEn() {
    return (
      <View style={[styles.tableView, { fontWeight: 'bold', backgroundColor: '#eee' }]}>
        <View style={[styles.tableCellBox, { width: '35px' }]}>
          <Text style={styles.tableText}>{locale?.en?.srno}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '32px' }]}>
          <Text style={styles.tableText}>{locale?.en?.code}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '170px', padding: '5px' }]}>
          <Text style={[styles.tableText, { textAlign: 'left' }]}>{locale?.en?.description}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.en?.unitofmeasure}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '36px' }]}>
          <Text style={styles.tableText}>{locale?.en?.unitprice}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.en?.quantity}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '32px' }]}>
          <Text style={styles.tableText}>{locale?.en?.discount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.en?.netamount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.en?.vatpercent}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.en?.taxamount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.en?.totalamount}</Text>
        </View>
      </View>
    );
  }

  function TableHeadAr() {
    return (
      <View style={[styles.tableView, { fontWeight: 'bold', backgroundColor: '#eee' }]}>
        <View style={[styles.tableCellBox, { width: '35px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.srno}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '32px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.code}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '170px', padding: '5px' }]}>
          <Text style={[styles.tableText, { textAlign: 'left' }]}>{locale?.ar?.description}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.unitofmeasure}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '36px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.unitprice}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.quantity}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '32px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.discount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.netamount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '28px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.vatpercent}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.taxamount}</Text>
        </View>
        <View style={[styles.tableCellBox, { width: '42px' }]}>
          <Text style={styles.tableText}>{locale?.ar?.totalamount}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <TableHeadEn />
      <TableHeadAr />
    </>
  );
}

function TableCell({ data, srno }) {
  const sellingPrice = data?.sellingPrice ?? 0;
  const quantity = data?.quantity ?? 0;
  const discountPrice = data?.discountPrice ?? 0;
  const vatPercentage = data?.vatPercentage ?? 0;
  const totalDiscountPrice = discountPrice * quantity;
  const netAmount = (sellingPrice * quantity - totalDiscountPrice).toFixed(2);
  const taxAmount = (netAmount * (vatPercentage / 100)).toFixed(2);
  const totalAmount = (parseFloat(netAmount) + parseFloat(taxAmount)).toFixed(2);
  return (
    <View style={[styles.tableView, { marginBottom: '4px' }]}>
      <View style={[styles.tableCellBox, { width: '35px' }]}>
        <Text style={styles.tableText}>{srno}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '32px' }]}>
        <Text style={styles.tableText}>{data?.code ?? '-'}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '170px', paddingLeft: '5px' }]}>
        <Text style={[styles.tableText, { textAlign: 'left' }]}>
          {data?.product?.en}
          {data?.product?.ar ? ` / ${data?.product?.ar}` : null}
        </Text>
      </View>
      <View style={[styles.tableCellBox, { width: '28px' }]}>
        <Text style={styles.tableText}>{data?.uom ?? '-'}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '36px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(sellingPrice)}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '28px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(quantity)}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '32px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(parseFloat(totalDiscountPrice).toFixed(4)?.replace('.0000', '.00'))}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(netAmount)}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '28px' }]}>
        <Text style={styles.tableText}>{`${vatPercentage} %`}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(taxAmount)}</Text>
      </View>
      <View style={[styles.tableCellBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(totalAmount)}</Text>
      </View>
    </View>
  );
}

function TableFooter({ netAmount, totalTax }) {
  return (
    <View style={[styles.tableView, { fontWeight: 'bold' }]}>
      <View style={[styles.tableFooterBox, { width: '361px' }]}>
        <Text style={[styles.tableText, { textAlign: 'left' }]}>
          {`${locale?.en?.totalinsar} ${locale?.ar?.totalinsar?.length ? `/ ${locale?.ar?.totalinsar}` : ''}`}
        </Text>
      </View>
      <View style={[styles.tableFooterBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(netAmount)}</Text>
      </View>
      <View style={[styles.tableFooterBox, { width: '28px' }]}>
        <Text style={styles.tableText}>+</Text>
      </View>
      <View style={[styles.tableFooterBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber(totalTax)}</Text>
      </View>
      <View style={[styles.tableFooterBox, { width: '42px' }]}>
        <Text style={styles.tableText}>{toFormattedNumber((parseFloat(netAmount) + parseFloat(totalTax)).toFixed(2))}</Text>
      </View>
    </View>
  );
}

function Footer({ orderId, orderNo }) {
  return (
    <View fixed style={styles.footerView}>
      <View style={[styles.justifyContentCenter, { width: '40%' }]}>
        {orderId?.trim()?.length ? (
          <Text
            style={styles.footerText}
            render={({ pageNumber }) => (pageNumber !== 1 ? `Order No: ${orderId?.trim()?.replace('ORDR', '').toUpperCase()}` : null)}
          />
        ) : null}
      </View>
      <View style={[styles.justifyContentCenter, { width: '40%' }]}>
        {orderNo?.trim()?.length ? (
          <Text
            style={styles.footerText}
            render={({ pageNumber }) => (pageNumber !== 1 ? `Invoice No: ${orderNo?.trim()?.toUpperCase()}` : null)}
          />
        ) : null}
      </View>
      <View style={[styles.justifyContentCenter, { width: '20%' }]}>
        <Text
          style={[styles.footerText, styles.textAlignRight]}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </View>
  );
}

function Template({ order = '' }) {
  return (
    <Document
      title={`${order?.orderNo ?? ''}`}
      author="https://github.com/krishnaprasad1991"
      subject={`${order?.type ?? ''}`}
      keywords=""
      creator="www.atmtksa.com"
      producer="www.atmtksa.com"
    >
      <Page size="A4" style={styles.page} wrap>
        <Header data={order?.company} />
        <Title orderType={order?.type} />
        <View
          style={{
            width: '515px',
            height: '170px',
            flexDirection: 'row',
            paddingBottom: '8px',
          }}
        >
          <Details data={order} />
          <QRCode data={order?.qrCodeData} />
        </View>
        <TableHead />
        {order?.items?.length ? order?.items?.map((item, index) => <TableCell key={index} srno={index + 1} data={item} />) : null}
        <TableFooter netAmount={order?.netAmount} totalTax={order?.totalTax} />
        <Footer orderId={order?.id} orderNo={order?.orderNo} />
      </Page>
    </Document>
  );
}

export default Template;
