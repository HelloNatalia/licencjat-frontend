const parseXML = (xml) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const geonames = Array.from(xmlDoc.getElementsByTagName("geoname"));

  const result = geonames.map((geoname) => {
    const result = {};
    Array.from(geoname.children).forEach((child) => {
      result[child.tagName] = child.textContent;
    });
    return result;
  });

  return result;
};

export default parseXML;
