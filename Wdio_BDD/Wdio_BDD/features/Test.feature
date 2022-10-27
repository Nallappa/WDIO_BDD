Feature: The Internet Guinea Pig Website

  Scenario Outline: Validate the abcd rack slots and rack item count
    Given User Login to DCO IP "<url>" with the given credentials "<username>" "<password>"
    When Naviagate to abcd room "<Rack>" and equipment room "<EquipmentName>"
    Then Validate Rack count "<count>"
    Then Get Rack item count
    Examples:
      | username    | password | url                         | Rack   | EquipmentName | count |
      | team44user1 | Test@123 | https://10.179.230.168/web/ | Team44 | SRT5KRMXLT    | 42    |


  # Scenario Outline: Validate the abcd drag and drop of rack items
  #   Given User Login to DCO IP "<url>" with the given credentials "<username>" "<password>"
  #   When Naviagate to abcd room "<Rack>" and equipment room "<EquipmentName>"
  #   Then Drag and drop in the front view
  #   Examples:
  #     | username    | password | url                         | Rack   | EquipmentName |
  #     | team44user1 | Test@123 | https://10.179.230.168/web/ | Team44 | SRT5KRMXLT    |

  # Scenario Outline: Validate the abcd drag and drop of rack items
  #   Given User Login to DCO IP "<url>" with the given credentials "<username>" "<password>"
  #   Then Navigate to downloads page and download the exe file
  #   Then Validate the downloaded exe file
  #   Examples:
  #     | username    | password | url                         |
  #     | team44user1 | Test@123 | https://10.179.230.168/web/ |