import React, { useState, useEffect } from "react";
import { Flex, Text } from "rebass";
import Button from "../button";
import { ev } from "../../common";
import ListItem from "../list-item";
import TimeAgo from "timeago-react";
import ListContainer from "../list-container";

function ListView({ type, getItems, menu, button, onClick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function onRefreshItems() {
      setItems(getItems);
    }
    onRefreshItems();
    ev.addListener(`refresh${type}`, onRefreshItems);
    return () => {
      ev.removeListener(`refresh${type}`, onRefreshItems);
    };
  }, [getItems, type]);
  return (
    items && (
      <ListContainer
        itemsLength={items.length}
        item={index => {
          const item = items[index];
          return (
            <ListItem
              title={item.title}
              body={item.headline}
              index={index}
              onClick={onClick.bind(this, item)} //TODO
              info={
                <Flex justifyContent="center" alignItems="center">
                  <TimeAgo datetime={item.dateDeleted || item.dateCreated} />
                  <Text as="span" mx={1}>
                    •
                  </Text>
                  <Text color="primary">
                    {item.type[0].toUpperCase() + item.type.substring(1)}
                  </Text>
                </Flex>
              }
              menuData={item}
              menuItems={menu.menuItems(item)}
              dropdownRefs={menu.dropdownRefs}
            />
          );
        }}
        button={button}
      />
    )
  );
}

export default ListView;
